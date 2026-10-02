import {defineEntity, EntityRepositoryType, p, type EventArgs} from '@mikro-orm/core';
import {EntityRepository, type RequiredEntityData} from '@mikro-orm/mariadb';
import bcrypt from 'bcryptjs';

async function hashPassword({entity, changeSet}: EventArgs<{password: string}>) {
    if (changeSet?.payload.password !== undefined) {
        entity.password = await bcrypt.hash(entity.password, 12);
    }
}

export const UserSchema = defineEntity({
    name: 'User',
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
    [EntityRepositoryType]?: UserRepository;

    checkPassword(plain: string) {
        return bcrypt.compare(plain, this.password);
    }
}

export class UserRepository extends EntityRepository<User> {
    findByEmail(email: string) {
        return this.findOne({email: email.toLowerCase().trim()});
    }

    async store(data: RequiredEntityData<User>) {
        const user = this.create(data);
        await this.em.flush();

        return user;
    }
}

UserSchema.setClass(User);
UserSchema.setCustomRepository(() => UserRepository);
