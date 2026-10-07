import {defineConfig} from 'cypress';
import {dbManager} from './cypress/lib/dbManager.ts';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:5174',
        setupNodeEvents(on) {
            on('task', {
                'db:reset': async () => await dbManager.reset(),
                'db:createUser': async (user) => await dbManager.createUser(user),
            });
            on('after:run', () => dbManager.close());
        },
    },
});
