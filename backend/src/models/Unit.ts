import {asc, eq} from 'drizzle-orm';
import {db} from '../db.ts';
import {units} from '../schema.ts';

export type Unit = typeof units.$inferSelect;
export type NewUnit = typeof units.$inferInsert;

export const unitRepository = {
    async all(): Promise<Unit[]> {
        return db.select().from(units).orderBy(asc(units.name));
    },

    async findById(id: number): Promise<Unit | undefined> {
        const [unit] = await db.select().from(units).where(eq(units.id, id));

        return unit;
    },

    async findByColor(color: string): Promise<Unit | undefined> {
        const [unit] = await db.select().from(units).where(eq(units.color, color));

        return unit;
    },

    async findByName(name: string): Promise<Unit | undefined> {
        const [unit] = await db.select().from(units).where(eq(units.name, name));

        return unit;
    },

    async store(data: NewUnit): Promise<Unit> {
        const [inserted] = await db.insert(units).values(data).$returningId();

        return (await this.findById(inserted!.id))!;
    },

    async delete(id: number): Promise<void> {
        await db.delete(units).where(eq(units.id, id));
    },

    async update(id: number, data: Partial<NewUnit>): Promise<Unit> {
        await db.update(units).set({name: data.name, color: data.color}).where(eq(units.id, id));

        return (await this.findById(id))!;
    },
};
