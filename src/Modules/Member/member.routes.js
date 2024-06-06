import {Router} from 'express';
import * as memberController from './member.controller.js';

const router = Router();


router.post('/add', memberController.addMember);
router.get('/all_members', memberController.getAllMembers);
router.get('/', memberController.getMemberById);
router.put('/update/:id', memberController.updateMember);
router.put('/delete/:id', memberController.deleteMember);



export default router;
