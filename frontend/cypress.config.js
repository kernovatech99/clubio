import {defineConfig} from 'cypress';
import {dbManager} from './cypress/lib/dbManager.ts';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:5174',
        setupNodeEvents(on) {
            on('task', {
                'db:reset': () => dbManager.reset(),
                'db:createUser': (user) => dbManager.createUser(user),
            });
            on('after:run', () => dbManager.close());
        },
    },
});
