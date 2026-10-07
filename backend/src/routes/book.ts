import {Router} from 'express';
import {bookRepository} from '../models/Book.ts';

export const bookRouter = Router();

bookRouter.get('/', async (_req, res) => {
    res.json({data: await bookRepository.all()});
});

bookRouter.post('/', async (req, res) => {
    await bookRepository.store(req.body);
    res.json({data: await bookRepository.all()});
});

bookRouter.delete('/:id', async (req, res) => {
    await bookRepository.delete(req.params.id);
    res.json({data: await bookRepository.all()});
});

bookRouter.put('/:id', async (req, res) => {
    await bookRepository.update(req.params.id, req.body);
    res.json({data: await bookRepository.all()});
});
