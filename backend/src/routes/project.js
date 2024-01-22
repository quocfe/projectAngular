import express from 'express';
import projectController from '../controllers/Project.js';

const router = express.Router();

router.put('/:id', projectController.update);
router.delete('/:id', projectController.delete);
router.get('/:id', projectController.findOne);
router.get('/', projectController.find);
router.post('/', projectController.save);

export default router;
