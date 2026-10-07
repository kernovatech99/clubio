import {eq} from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import {db} from '../db.ts';
import {users} from '../schema.ts';

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const userRepository = {
    async findById(id: number): Promise<User | undefined> {
        const [user] = await db.select().from(users).where(eq(users.id, id));

        return user;
    },

    async findByEmail(email: string): Promise<User | undefined> {
        const [user] = await db.select().from(users).where(eq(users.email, email.toLowerCase().trim()));

        return user;
    },

    async store(data: NewUser): Promise<User> {
        const password = await bcrypt.hash(data.password, 12);
        const [inserted] = await db
            .insert(users)
            .values({...data, password})
            .$returningId();

        return (await this.findById(inserted!.id))!;
    },
};

export function checkPassword(user: User, plain: string) {
    return bcrypt.compare(plain, user.password);
}

// Strips the fields that must never leave the backend
export function serializeUser({password: _password, ...user}: User) {
    return user;
}
