import {z} from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().int().positive().default(3000),
    MONGODB_URI: z.url(),
    CORS_ORIGIN: z.string().default('http://localhost:5173'),
});

const result = envSchema.parse(process.env);

export const env = result;
