export type NewUser = {name: string; email: string; password: string};

// Reuses the backend's MikroORM setup and entities, so the tests hit the same test database and schema as the backend's `dev:test` server
async function loadBackend() {
    // Has to be loaded before the backend modules, they validate process.env on import
    process.loadEnvFile(new URL('../../../backend/.env.test', import.meta.url));

    const [{orm}, {User}] = await Promise.all([import('../../../backend/src/db.ts'), import('../../../backend/src/models/User.ts')]);

    // Drops and recreates all tables once per run, so the schema always matches the entities
    await orm.schema.refresh();

    return {orm, User};
}

let backend: ReturnType<typeof loadBackend> | undefined;

function getBackend() {
    return (backend ??= loadBackend());
}

export const dbManager = {
    // Empties all tables but keeps the schema
    async reset() {
        const {orm} = await getBackend();
        await orm.schema.clear();
        return null;
    },

    async createUser(data: NewUser) {
        const {orm, User} = await getBackend();
        const user = await orm.em.fork().getRepository(User).store(data);
        return {id: user.id, name: user.name, email: user.email};
    },

    async close() {
        if (backend) {
            const {orm} = await backend;
            await orm.close();
        }
    },
};
