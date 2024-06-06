import {Router} from 'express';
import * as trainerController from './trainer.controller.js';

const router = Router();


router.post('/add', trainerController.addTrainer);
router.get('/all_trainers', trainerController.getAllTrainers);
router.get('/', trainerController.getTrainerById);
router.put('/update/:id', trainerController.updateTrainer);
router.delete('/delete/:id', trainerController.deleteTrainer);



export default router;
