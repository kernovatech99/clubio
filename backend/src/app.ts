import express from 'express';
import {connectDb} from './db.ts';
import {env} from './env.ts';
import {authRouter} from './routes/auth.ts';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
    res.json({status: 'ok'});
});

app.use(authRouter);

await connectDb();

app.listen(env.PORT, () => {
    console.log(`Server listening on http://localhost:${env.PORT}`);
});
