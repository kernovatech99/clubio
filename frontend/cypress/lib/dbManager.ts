import bcrypt from 'bcryptjs';
import {MongoClient} from 'mongodb';
import {loadEnv} from 'vite';

// Same .env.test the frontend test server uses; MONGODB_URI must point to the backend's test database
const {MONGODB_URI} = loadEnv('test', process.cwd(), '');

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set in frontend/.env.test');
}

const client = new MongoClient(MONGODB_URI);

export type NewUser = {name: string; email: string; password: string};

export const dbManager = {
    // Empties all collections but keeps their indexes (e.g. unique email)
    async reset() {
        const collections = await client.db().collections();
        await Promise.all(collections.map((collection) => collection.deleteMany({})));
        return null;
    },

    async createUser({name, email, password}: NewUser) {
        const now = new Date();
        const user = {name, email: email.toLowerCase(), password: await bcrypt.hash(password, 4), createdAt: now, updatedAt: now};
        const {insertedId} = await client.db().collection('users').insertOne(user);
        return {_id: insertedId.toString(), name: user.name, email: user.email};
    },

    close() {
        return client.close();
    },
};
