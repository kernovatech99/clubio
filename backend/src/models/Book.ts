import {eq} from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import {db} from '../db.ts';
import {books} from '../schema.ts';

export type Book = typeof books.$inferSelect;
export type NewBook = typeof books.$inferInsert;

export const bookRepository = {
    async findById(id: number): Promise<Book | undefined> {
        const [book] = await db.select().from(books).where(eq(books.id, id));

        return book;
    },

    async store(data: NewBook): Promise<Book> {
        const [inserted] = await db.insert(books).values(data).$returningId();

        return (await this.findById(inserted!.id))!;
    },
};
