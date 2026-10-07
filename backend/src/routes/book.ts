import {Router} from 'express';
import {bookRepository} from '../models/Book.ts';
import {z} from 'zod';

export const bookRouter = Router();

export const useInputValidation = (req, res, next) => {
    const bookStoreValidator = z.object({
        name: z.string('Name muss vorhanden sein.').min(5),
        color: z.string('Farbe muss vorhanden sein.').min(5),
    });
    const parsed = bookStoreValidator.safeParse(req.body);
    if (!parsed.success) {
        res.status(422).json(z.flattenError(parsed.error));
        return;
    } else {
        next();
    }
};

bookRouter.get('/', async (_req, res) => {
    res.json({data: await bookRepository.all()});
});

bookRouter.post('/', useInputValidation, async (req, res) => {
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
