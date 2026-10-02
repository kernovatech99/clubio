import {orm} from '../db.ts';
import {User} from '../models/User.ts';

const email = 'test@test.de';
const password = 'secret';

const users = orm.em.fork().getRepository(User);

if (!(await users.findByEmail(email))) {
    await users.store({name: 'Max Muster', email, password});
}

await orm.close();

console.log(`Test user ready: ${email} / ${password}`);
