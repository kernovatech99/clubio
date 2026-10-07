import {defineConfig} from 'drizzle-kit';
import {env} from './src/env';

export default defineConfig({
    dialect: 'mysql',
    schema: './db/schema.ts',
    out: './db/migrations',
    dbCredentials: {
        host: env.DB_HOST,
        port: env.DB_PORT,
        password: env.DB_PASSWORD,
        user: env.DB_USER,
        database: env.DB_NAME,
    },
});
