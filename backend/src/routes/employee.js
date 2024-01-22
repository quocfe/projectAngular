import express from 'express';
import employeeController from '../controllers/Employee.js';
import { authenticateToken } from './../middleware/authenticateToken.js';

const router = express.Router();

router.post('/', employeeController.save);
router.get('/', employeeController.find);
router.get('/profile', employeeController.profileUser);
router.get('/:id', employeeController.findOne);
router.put('/:id', employeeController.update);
router.delete('/:id', employeeController.delete);

export default router;
