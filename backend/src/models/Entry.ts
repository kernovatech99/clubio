import {desc, eq} from 'drizzle-orm';
import {db} from '../db.ts';
import {entries} from '../schema.ts';

export type Entry = typeof entries.$inferSelect;
export type NewEntry = typeof entries.$inferInsert;

export const entryRepository = {
    async all(): Promise<Entry[]> {
        return db.select().from(entries).orderBy(desc(entries.date), desc(entries.id));
    },

    async findById(id: number): Promise<Entry | undefined> {
        const [entry] = await db.select().from(entries).where(eq(entries.id, id));

        return entry;
    },

    async store(data: NewEntry): Promise<Entry> {
        const [inserted] = await db.insert(entries).values(data).$returningId();

        return (await this.findById(inserted!.id))!;
    },

    async delete(id: number): Promise<void> {
        await db.delete(entries).where(eq(entries.id, id));
    },

    async update(id: number, data: Partial<NewEntry>): Promise<Entry> {
        await db
            .update(entries)
            .set({
                date: data.date,
                description: data.description,
                bookId: data.bookId,
                unitId: data.unitId,
                categoryId: data.categoryId,
                amount: data.amount,
                receiptNumber: data.receiptNumber,
                document: data.document,
            })
            .where(eq(entries.id, id));

        return (await this.findById(id))!;
    },

    // Eine geprüfte Buchung bleibt geprüft, daher gibt es keinen Weg zurück.
    async review(id: number): Promise<void> {
        await db.update(entries).set({reviewed: true}).where(eq(entries.id, id));
    },
};
