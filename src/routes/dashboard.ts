import { Router } from 'express';
import { isAuthenticated } from '../middleware/auth';

const router = Router();

router.get('/', isAuthenticated, (req, res) => {
  res.render('dashboard/index', {
    title: 'Dashboard',
    user: req.user
  });
});

export default router; 