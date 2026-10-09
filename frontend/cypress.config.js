import {defineConfig} from 'cypress';
import {dbManager} from './cypress/lib/dbManager.ts';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:5174',
        setupNodeEvents(on) {
            on('task', {
                'db:reset': async () => await dbManager.reset(),
                'db:createUser': async (user) => await dbManager.createUser(user),
                'db:createBook': async (book) => await dbManager.createBook(book),
                'db:createCategory': async (category) => await dbManager.createCategory(category),
                'db:createUnit': async (unit) => await dbManager.createUnit(unit),
                'db:seedEntries': async (data) => await dbManager.seedEntries(data),
            });
            on('after:run', () => dbManager.close());
        },
    },
});
