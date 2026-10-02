import express from 'express';
import cors from 'cors';
import {RequestContext} from '@mikro-orm/core';
import {connectDb, orm} from './db.ts';
import {env} from './env.ts';
import {authRouter} from './routes/auth.ts';

const app = express();

app.use(cors({origin: env.CORS_ORIGIN}));
app.use(express.json());
app.use((_req, _res, next) => RequestContext.create(orm.em, next));

app.get('/health', (_req, res) => {
    res.json({status: 'ok'});
});

app.use(authRouter);

await connectDb();

app.listen(env.PORT, () => {
    console.log(`Server listening on http://localhost:${env.PORT}`);
});
