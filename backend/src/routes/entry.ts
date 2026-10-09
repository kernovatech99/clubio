import {Router} from 'express';
import {bookRepository} from '../models/Book.ts';
import {categoryRepository} from '../models/Category.ts';
import {entryRepository} from '../models/Entry.ts';
import {unitRepository} from '../models/Unit.ts';
import {z} from 'zod';

export const entryRouter = Router();

const entryStoreValidator = z.object({
    date: z.iso.date('Datum muss vorhanden sein.'),
    description: z.string('Beschreibung muss vorhanden sein.').trim().min(1, 'Beschreibung muss vorhanden sein.').max(255),
    bookId: z.int('Kasse muss vorhanden sein.').refine(async (id) => !!(await bookRepository.findById(id)), 'Kasse ist nicht vorhanden.'),
    unitId: z
        .int()
        .refine(async (id) => !!(await unitRepository.findById(id)), 'Kostenstelle ist nicht vorhanden.')
        .nullish()
        .transform((id) => id ?? null),
    categoryId: z.int('Konto muss vorhanden sein.').refine(async (id) => !!(await categoryRepository.findById(id)), 'Konto ist nicht vorhanden.'),
    amount: z.int('Betrag muss vorhanden sein.').refine((amount) => amount !== 0, 'Betrag darf nicht 0 sein.'),
    receiptNumber: z
        .string()
        .trim()
        .max(255)
        .nullish()
        .transform((receiptNumber) => receiptNumber || null),
});

export const useInputValidation = async (req, res, next) => {
    const parsed = await entryStoreValidator.safeParseAsync(req.body);
    if (!parsed.success) {
        res.status(422).json(z.flattenError(parsed.error));
        return;
    } else {
        req.body = parsed.data;
        next();
    }
};

entryRouter.get('/', async (_req, res) => {
    res.json({data: await entryRepository.all()});
});

entryRouter.post('/', useInputValidation, async (req, res) => {
    await entryRepository.store(req.body);
    res.json({data: await entryRepository.all()});
});

entryRouter.delete('/:id', async (req, res) => {
    await entryRepository.delete(req.params.id);
    res.json({data: await entryRepository.all()});
});

entryRouter.put('/:id', useInputValidation, async (req, res) => {
    await entryRepository.update(req.params.id, req.body);
    res.json({data: await entryRepository.all()});
});

entryRouter.put('/:id/review', async (req, res) => {
    await entryRepository.review(req.params.id);
    res.json({data: await entryRepository.all()});
});
