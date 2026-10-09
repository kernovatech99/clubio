import child_process from 'node:child_process';
import {loadEnvFile} from 'node:process';
import type {NewUser} from '../../../backend/src/models/User.ts';

loadEnvFile('../backend/.env.test');
const {closeDb, dropAllTables} = await import('../../../backend/src/db.ts');

export const dbManager = {
    async close() {
        await closeDb();
    },

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

    async createCategory(values: any) {
        const {categoryRepository} = await import('../../../backend/src/models/Category.ts');
        return await categoryRepository.store(values);
    },

    async createUnit(values: any) {
        const {unitRepository} = await import('../../../backend/src/models/Unit.ts');
        return await unitRepository.store(values);
    },

    // Legt Kostenstellen, Konten und Buchungen an. Buchungen verweisen per Name auf Kasse, Kostenstelle und Konto.
    async seedEntries({units = [], categories = [], entries = []}: any) {
        const {bookRepository} = await import('../../../backend/src/models/Book.ts');
        const {categoryRepository} = await import('../../../backend/src/models/Category.ts');
        const {unitRepository} = await import('../../../backend/src/models/Unit.ts');
        const {entryRepository} = await import('../../../backend/src/models/Entry.ts');

        for (const unit of units) {
            await unitRepository.store(unit);
        }
        for (const category of categories) {
            await categoryRepository.store(category);
        }
        for (const {book, unit, category, ...values} of entries) {
            await entryRepository.store({
                ...values,
                bookId: (await bookRepository.findByName(book))!.id,
                unitId: unit ? (await unitRepository.findByName(unit))!.id : null,
                categoryId: (await categoryRepository.findByName(category))!.id,
            });
        }
        return null;
    },
};
