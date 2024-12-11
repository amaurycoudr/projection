import { contract } from '@repo/contract';
import { initClient } from '@ts-rest/core';
import { useToken } from '../hooks/useToken';
import axios, { Method, AxiosError, AxiosResponse, isAxiosError } from 'axios';

const BASE_URL = 'http://localhost:3000';
const axiosInstance = axios.create({
    baseURL: BASE_URL,
});
export class Axios {
    client = () => {
        return initClient(contract, {
            baseUrl: BASE_URL,
            baseHeaders: { 'Content-Type': 'application/json' },
            api: async ({ path, method, headers, body }) => {
                try {
                    const result = await axiosInstance.request({
                        method: method as Method,
                        url: path,
                        headers: {
                            ...headers,
                        },
                        data: body,
                    });
                    return { status: result.status, body: result.data, headers: result.headers as unknown as Headers };
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (e: Error | AxiosError | any) {
                    if (isAxiosError(e)) {
                        const error = e as AxiosError;
                        const response = error.response as AxiosResponse;
                        return { status: response.status, body: response.data, headers: response.headers as unknown as Headers };
                    }
                    throw e;
                }
            },
        });
    };
}
export const axiosClient = new Axios().client();

axiosInstance.interceptors.request.use(async (config) => {
    const state = useToken.getState();

    if (state.userStatus === 'unauthenticated') {
        return config;
    }

    const { accessToken, exp, refreshToken } = state;

    const isExpired = exp! * 1000 - 2000 < Date.now();

    if (!isExpired) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    }

    const result = await fetch(`${BASE_URL}/api/v1/auth/refresh-tokens`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: refreshToken }),
    });
    const status = result.status;
    const body = await result.json();

    if (status !== 200) {
        useToken.getState().clearTokens();
        return config;
    }
    useToken.getState().handleTokens(body);
    config.headers.Authorization = `Bearer ${body.accessToken}`;

    return config;
});
