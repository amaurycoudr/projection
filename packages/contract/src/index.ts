import { initContract } from '@ts-rest/core';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';

import { z } from 'zod';

extendZodWithOpenApi(z);

const c = initContract();

export const AUTH_ERRORS = {
    unknownUser: 'unknownUser',
    wrongPassword: 'wrongPassword',
    emailAlreadyUsed: 'emailAlreadyUsed',
} as const;

export type AuthErrors = (typeof AUTH_ERRORS)[keyof typeof AUTH_ERRORS];

const authContract = c.router({
    signUp: {
        path: '/auth/sign-up',
        method: 'POST',
        body: z.object({ email: z.string().email(), password: z.string().min(8).max(50) }),
        responses: { 201: z.object({ accessToken: z.string() }), 400: z.object({ message: z.literal(AUTH_ERRORS.emailAlreadyUsed) }) },
    },
    signIn: {
        path: '/auth/sign-in',
        method: 'POST',
        body: z.object({ email: z.string(), password: z.string() }),
        responses: {
            200: z.object({ accessToken: z.string() }),
            403: z.object({
                message: z.enum([AUTH_ERRORS.unknownUser, AUTH_ERRORS.wrongPassword]),
            }),
        },
    },
});

export const contract = c.router(
    {
        core: {
            getHealth: {
                path: '/health',
                method: 'GET',
                responses: { 200: z.object({ status: z.string() }) },
            },
        },
        auth: authContract,
    },
    {
        strictStatusCodes: true,
        pathPrefix: '/api/v1',
        commonResponses: {
            500: z.object({
                statusCode: z.number(),
                message: z.literal('Internal server error'),
            }),
        },
    },
);
