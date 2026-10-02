import {defineConfig} from '@mikro-orm/mariadb';
import {env} from './env.ts';
import {UserSchema} from './models/User.ts';

export default defineConfig({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    dbName: env.DB_NAME,
    entities: [UserSchema],
    debug: env.NODE_ENV === 'development',
});
