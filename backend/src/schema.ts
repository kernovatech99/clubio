import {datetime, int, mysqlTable, varchar} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('user', {
    id: int().autoincrement().primaryKey(),
    name: varchar({length: 255}).notNull(),
    email: varchar({length: 255}).notNull().unique(),
    password: varchar({length: 255}).notNull(),
    createdAt: datetime('created_at')
        .notNull()
        .$defaultFn(() => new Date()),
    updatedAt: datetime('updated_at')
        .notNull()
        .$defaultFn(() => new Date())
        .$onUpdateFn(() => new Date()),
});

export const books = mysqlTable('book', {
    id: int().autoincrement().primaryKey(),
    name: varchar({length: 255}).notNull().unique(),
    color: varchar({length: 255}).notNull().unique(),
    createdAt: datetime('created_at')
        .notNull()
        .$defaultFn(() => new Date()),
    updatedAt: datetime('updated_at')
        .notNull()
        .$defaultFn(() => new Date())
        .$onUpdateFn(() => new Date()),
});

export const categories = mysqlTable('category', {
    id: int().autoincrement().primaryKey(),
    name: varchar({length: 255}).notNull().unique(),
    color: varchar({length: 255}).notNull().unique(),
    createdAt: datetime('created_at')
        .notNull()
        .$defaultFn(() => new Date()),
    updatedAt: datetime('updated_at')
        .notNull()
        .$defaultFn(() => new Date())
        .$onUpdateFn(() => new Date()),
});

export const units = mysqlTable('unit', {
    id: int().autoincrement().primaryKey(),
    name: varchar({length: 255}).notNull().unique(),
    color: varchar({length: 255}).notNull().unique(),
    createdAt: datetime('created_at')
        .notNull()
        .$defaultFn(() => new Date()),
    updatedAt: datetime('updated_at')
        .notNull()
        .$defaultFn(() => new Date())
        .$onUpdateFn(() => new Date()),
});
