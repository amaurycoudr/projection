import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const AUTH_ERRORS = {
    unknownUser: 'unknownUser',
    wrongPassword: 'wrongPassword',
} as const;

const authContract = c.router({
    signUp: {
        path: 'auth/sign-up',
        method: 'POST',
        body: z.object({ email: z.string().email(), password: z.string().min(8).max(50) }),
        responses: { 201: z.object({ token: z.string() }) },
    },
    signIn: {
        path: 'auth/sign-in',
        method: 'POST',
        body: z.object({ email: z.string(), password: z.string() }),
        responses: {
            200: z.object({ token: z.string() }),
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
    { strictStatusCodes: true },
);
