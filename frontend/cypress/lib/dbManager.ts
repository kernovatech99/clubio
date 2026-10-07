import child_process from 'node:child_process';
import {loadEnvFile} from 'node:process';
import {type NewUser} from '../../../backend/src/models/User.ts';

loadEnvFile('../backend/.env.test');
const {dropAllTables} = await import('../../../backend/src/db.ts');

export const dbManager = {
    async reset() {
        await dropAllTables();
        child_process.execSync('cd ../backend && node --env-file-if-exists=.env.test ./node_modules/.bin/drizzle-kit migrate');
        return 0;
    },

    async createUser(values: NewUser) {
        const {userRepository} = await import('../../../backend/src/models/User.ts');
        return await userRepository.store(values);
    },

    async createBook(values: any) {
        const {bookRepository} = await import('../../../backend/src/models/Book.ts');
        return await bookRepository.store(values);
    },
};
