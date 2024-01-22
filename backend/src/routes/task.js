import express from 'express';
import TaskController from '../controllers/Task.js';

const router = express.Router();

router.put('/:id', TaskController.update);
router.delete('/:id', TaskController.delete);
router.get('/employee/:id', TaskController.findByIDEmployee);
router.get('/withNameEmployee', TaskController.findWithNameEmployee);
router.get('/withProjectEmployee', TaskController.findwithProjectEmployee);
router.get('/:id', TaskController.findOne);
router.get('/', TaskController.find);
router.post('/', TaskController.save);

export default router;
