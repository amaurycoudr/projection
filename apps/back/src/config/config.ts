import { z } from 'zod';

export const configSchema = z.object({
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_USER: z.string(),
    POSTGRES_PORT: z.coerce.number(),
    POSTGRES_HOST: z.string(),

    BASE_URL: z.string(),

    JWT_SECRET: z.string(),
    JWT_TOKEN_AUDIENCE: z.string(),
    JWT_TOKEN_ISSUER: z.string(),
    JWT_ACCESS_TOKEN_TTL: z.coerce.number(),
});

export type Config = z.infer<typeof configSchema>;
