import {defineEntity, p, type EventArgs} from '@mikro-orm/core';
import bcrypt from 'bcryptjs';

async function hashPassword({entity, changeSet}: EventArgs<{password: string}>) {
    if (changeSet?.payload.password !== undefined) {
        entity.password = await bcrypt.hash(entity.password, 12);
    }
}

export const UserSchema = defineEntity({
    name: 'User',
    tableName: 'users',
    properties: {
        id: p.integer().primary(),
        name: p.string(),
        email: p.string().unique(),
        password: p.string().hidden(),
        createdAt: p.datetime().onCreate(() => new Date()),
        updatedAt: p
            .datetime()
            .onCreate(() => new Date())
            .onUpdate(() => new Date()),
    },
    hooks: {
        beforeCreate: [hashPassword],
        beforeUpdate: [hashPassword],
    },
});

export class User extends UserSchema.class {
    checkPassword(plain: string) {
        return bcrypt.compare(plain, this.password);
    }
}

UserSchema.setClass(User);
