import { Router } from 'express';
import * as authController from '../controllers/authController';
import { isAuthenticated } from '../middleware/auth';

const router = Router();

// Auth routes
router.get('/login', authController.login);
router.post('/login', authController.loginPostHTMX);
router.get('/register', authController.register);
router.post('/register', authController.registerPostHTMX);
router.get('/logout', isAuthenticated, authController.logout);
export default router; 