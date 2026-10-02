import {MikroORM} from '@mikro-orm/mariadb';
import config from './mikro-orm.config.ts';
import {env} from './env.ts';

export const orm = new MikroORM(config);

export async function connectDb() {
    await orm.connect();
    console.log(`Connected to MariaDB: ${env.DB_NAME}`);
}
