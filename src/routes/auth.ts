import { Router } from 'express';
import * as authController from '../controllers/authController';
import { isAuthenticated } from '../middleware/auth';

const router = Router();

// Auth routes
router.get('/login', authController.login);
router.post('/login', authController.login);
router.get('/register', authController.register);
router.post('/register', authController.register);
router.get('/logout', isAuthenticated, authController.logout);
export default router;