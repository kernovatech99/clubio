import {Router} from 'express';
import {unitRepository} from '../models/Unit.ts';
import {z} from 'zod';

export const unitRouter = Router();

export const useInputValidation = async (req, res, next) => {
    const unitStoreValidator = z.object({
        name: z
            .string('Name muss vorhanden sein.')
            .min(5)
            .refine(async (name) => {
                const units = await unitRepository.findByName(name);
                return !units || (req.params.id && units?.id === parseInt(req.params.id));
            }, 'Name ist schon vorhanden.'),
        color: z
            .string('Farbe muss vorhanden sein.')
            .min(5)
            .refine(async (color) => {
                const units = await unitRepository.findByColor(color);
                return !units || (req.params.id && units?.id === parseInt(req.params.id));
            }, 'Farbe ist schon vorhanden.'),
    });
    const parsed = await unitStoreValidator.safeParseAsync(req.body);
    if (!parsed.success) {
        res.status(422).json(z.flattenError(parsed.error));
        return;
    } else {
        next();
    }
};

unitRouter.get('/', async (_req, res) => {
    res.json({data: await unitRepository.all()});
});

unitRouter.post('/', useInputValidation, async (req, res) => {
    await unitRepository.store(req.body);
    res.json({data: await unitRepository.all()});
});

unitRouter.delete('/:id', async (req, res) => {
    await unitRepository.delete(req.params.id);
    res.json({data: await unitRepository.all()});
});

unitRouter.put('/:id', useInputValidation, async (req, res) => {
    await unitRepository.update(req.params.id, req.body);
    res.json({data: await unitRepository.all()});
});
