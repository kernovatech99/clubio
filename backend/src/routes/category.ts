import {Router} from 'express';
import {categoryRepository} from '../models/Category.ts';
import {z} from 'zod';

export const categoryRouter = Router();

export const useInputValidation = async (req, res, next) => {
    const categoryStoreValidator = z.object({
        name: z
            .string('Name muss vorhanden sein.')
            .min(5)
            .refine(async (name) => {
                const categories = await categoryRepository.findByName(name);
                return !categories || (req.params.id && categories?.id === parseInt(req.params.id));
            }, 'Name ist schon vorhanden.'),
        color: z
            .string('Farbe muss vorhanden sein.')
            .min(5)
            .refine(async (color) => {
                const categories = await categoryRepository.findByColor(color);
                return !categories || (req.params.id && categories?.id === parseInt(req.params.id));
            }, 'Farbe ist schon vorhanden.'),
    });
    const parsed = await categoryStoreValidator.safeParseAsync(req.body);
    if (!parsed.success) {
        res.status(422).json(z.flattenError(parsed.error));
        return;
    } else {
        next();
    }
};

categoryRouter.get('/', async (_req, res) => {
    res.json({data: await categoryRepository.all()});
});

categoryRouter.post('/', useInputValidation, async (req, res) => {
    await categoryRepository.store(req.body);
    res.json({data: await categoryRepository.all()});
});

categoryRouter.delete('/:id', async (req, res) => {
    await categoryRepository.delete(req.params.id);
    res.json({data: await categoryRepository.all()});
});

categoryRouter.put('/:id', useInputValidation, async (req, res) => {
    await categoryRepository.update(req.params.id, req.body);
    res.json({data: await categoryRepository.all()});
});
