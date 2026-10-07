import {closeDb} from '../db.ts';
import {userRepository} from '../models/User.ts';

const email = 'test@test.de';
const password = 'secret';

if (!(await userRepository.findByEmail(email))) {
    await userRepository.store({name: 'Max Muster', email, password});
}

await closeDb();

console.log(`Test user ready: ${email} / ${password}`);
