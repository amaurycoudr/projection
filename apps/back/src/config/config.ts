import { z } from 'zod';

export const configSchema = z.object({
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_USER: z.string(),
    POSTGRES_PORT: z.coerce.number(),
    POSTGRES_HOST: z.string(),
});

export type Config = z.infer<typeof configSchema>;
