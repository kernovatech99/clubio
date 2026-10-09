import {z} from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']),
    PORT: z.coerce.number().int().positive(),
    CORS_ORIGIN: z.string(),
    DB_HOST: z.ipv4(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
    DB_PORT: z.coerce.number().int().positive().min(1).max(65535),
    // Verzeichnis für gescannte Belege
    STORAGE_PATH: z.string().default('storage'),
});

const result = envSchema.parse(process.env);

export const env = result;
