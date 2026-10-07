import {drizzle} from 'drizzle-orm/mysql2';
import mysql, {type RowDataPacket} from 'mysql2/promise';
import {sql} from 'drizzle-orm';
import {env} from './env.ts';

const connection = await mysql.createPool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
});

export const db = drizzle({client: connection, logger: true});

export async function connectDb() {
    await db.execute(sql`select 1`);
    console.log(`Connected to MariaDB: ${env.DB_NAME}`);
}

export async function closeDb() {
    await connection.end();
}

export async function dropAllTables() {
    const [rows] = await connection.query<RowDataPacket[]>("select table_name as name from information_schema.tables where table_schema = database() and table_type = 'BASE TABLE'");

    await connection.query('set foreign_key_checks = 0');

    for (const {name} of rows) {
        await connection.query('DROP TABLE ' + name);
    }

    await connection.query('set foreign_key_checks = 1');
}
