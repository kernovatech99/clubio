import {Router} from 'express';
import {orm} from '../db.ts';
import {User} from '../models/User.ts';

export const authRouter = Router();

authRouter.post('/login', async (req, res) => {
    const {email, password} = req.body ?? {};

    const messages: Record<string, string[]> = {};

    if (typeof email !== 'string' || !email.trim()) {
        messages.email = ['Bitte E-Mail-Adresse angeben.'];
    }

    if (typeof password !== 'string' || !password) {
        messages.password = ['Bitte Passwort angeben.'];
    }

    if (Object.keys(messages).length > 0) {
        res.status(422).json({messages});
        return;
    }

    const user = await orm.em.findOne(User, {email: email.toLowerCase().trim()});

    if (!user || !(await user.checkPassword(password))) {
        res.status(401).json({messages: {email: ['E-Mail-Adresse oder Passwort ist falsch.']}});
        return;
    }

    res.json({user});
});
