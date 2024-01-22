import express from 'express';
import authController from '../controllers/Auth.js';

const router = express.Router();

router.post('/login', authController.login);
router.post('/refreshToken', authController.refreshToken);

export default router;
