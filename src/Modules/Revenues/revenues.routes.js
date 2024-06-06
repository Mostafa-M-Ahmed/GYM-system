import {Router} from 'express';
import * as revenuesController from './revenues.controller.js';

const router = Router();

router.get('/', revenuesController.getAllRevenues);
router.get('/:id', revenuesController.getTrainerRevenues);



export default router;
