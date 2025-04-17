import { Router } from 'express';
import * as authController from '../controllers/authController';
import { isAuthenticated } from '../middleware/auth';

const router = Router();

// Auth routes
router.get('/login', authController.login);
router.post('/login', authController.loginPost);
router.get('/register', authController.register);
router.post('/register', authController.registerPost);
router.get('/logout', isAuthenticated, authController.logout);
router.get('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

export default router; 