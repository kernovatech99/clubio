import {asc, eq} from 'drizzle-orm';
import {db} from '../db.ts';
import {categories} from '../schema.ts';

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export const categoryRepository = {
    async all(): Promise<Category[]> {
        return db.select().from(categories).orderBy(asc(categories.name));
    },

    async findById(id: number): Promise<Category | undefined> {
        const [category] = await db.select().from(categories).where(eq(categories.id, id));

        return category;
    },

    async findByColor(color: string): Promise<Category | undefined> {
        const [category] = await db.select().from(categories).where(eq(categories.color, color));

        return category;
    },

    async findByName(name: string): Promise<Category | undefined> {
        const [category] = await db.select().from(categories).where(eq(categories.name, name));

        return category;
    },

    async store(data: NewCategory): Promise<Category> {
        const [inserted] = await db.insert(categories).values(data).$returningId();

        return (await this.findById(inserted!.id))!;
    },

    async delete(id: number): Promise<void> {
        await db.delete(categories).where(eq(categories.id, id));
    },

    async update(id: number, data: Partial<NewCategory>): Promise<Category> {
        await db.update(categories).set({name: data.name, color: data.color}).where(eq(categories.id, id));

        return (await this.findById(id))!;
    },
};
