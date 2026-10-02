import {orm} from '../db.ts';
import {User} from '../models/User.ts';

const email = 'test@test.de';
const password = 'secret';

const em = orm.em.fork();

if (!(await em.findOne(User, {email}))) {
    em.create(User, {name: 'Max Muster', email, password});
    await em.flush();
}

await orm.close();

console.log(`Test user ready: ${email} / ${password}`);
