import {asc, eq} from 'drizzle-orm';
import {db} from '../db.ts';
import {books} from '../schema.ts';

export type Book = typeof books.$inferSelect;
export type NewBook = typeof books.$inferInsert;

export const bookRepository = {
    async all(): Promise<Book[]> {
        return db.select().from(books).orderBy(asc(books.name));
    },

    async findById(id: number): Promise<Book | undefined> {
        const [book] = await db.select().from(books).where(eq(books.id, id));

        return book;
    },

    async findByColor(color: string): Promise<Book | undefined> {
        const [book] = await db.select().from(books).where(eq(books.color, color));

        return book;
    },

    async findByName(name: string): Promise<Book | undefined> {
        const [book] = await db.select().from(books).where(eq(books.name, name));

        return book;
    },

    async store(data: NewBook): Promise<Book> {
        const [inserted] = await db.insert(books).values(data).$returningId();

        return (await this.findById(inserted!.id))!;
    },

    async delete(id: number): Promise<void> {
        await db.delete(books).where(eq(books.id, id));
    },

    async update(id: number, data: Partial<NewBook>): Promise<Book> {
        await db.update(books).set({name: data.name, color: data.color}).where(eq(books.id, id));

        return (await this.findById(id))!;
    },
};
