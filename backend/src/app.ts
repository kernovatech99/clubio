import express from 'express';
import cors from 'cors';
import {connectDb} from './db.ts';
import {env} from './env.ts';
import {authRouter} from './routes/auth.ts';
import {bookRouter} from './routes/book.ts';
import {categoryRouter} from './routes/category.ts';
import {entryRouter} from './routes/entry.ts';
import {unitRouter} from './routes/unit.ts';

const app = express();

app.use(cors({origin: env.CORS_ORIGIN}));
app.use(express.json());

app.get('/health', (_req, res) => {
    res.json({status: 'ok'});
});

app.use(authRouter);
app.use('/book', bookRouter);
app.use('/category', categoryRouter);
app.use('/unit', unitRouter);
app.use('/entry', entryRouter);

await connectDb();

app.listen(env.PORT, () => {
    console.log(`Server listening on http://localhost:${env.PORT}`);
});
