import {boolean, date, datetime, int, mysqlTable, varchar} from 'drizzle-orm/mysql-core';

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

export const entries = mysqlTable('entry', {
    id: int().autoincrement().primaryKey(),
    date: date({mode: 'string'}).notNull(),
    description: varchar({length: 255}).notNull(),
    bookId: int('book_id')
        .notNull()
        .references(() => books.id),
    unitId: int('unit_id').references(() => units.id),
    categoryId: int('category_id')
        .notNull()
        .references(() => categories.id),
    // Betrag in Cent, Ausgaben sind negativ
    amount: int().notNull(),
    receiptNumber: varchar('receipt_number', {length: 255}),
    checked: boolean().notNull().default(false),
    createdAt: datetime('created_at')
        .notNull()
        .$defaultFn(() => new Date()),
    updatedAt: datetime('updated_at')
        .notNull()
        .$defaultFn(() => new Date())
        .$onUpdateFn(() => new Date()),
});
