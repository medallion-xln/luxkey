import { Router } from 'express';

const router = Router();

router.get('/agents', (req, res) => {
  res.render('layout', {
    title: 'Agents',
    body: 'agents'
  });
});

router.get('/sell', (req, res) => {
  res.render('layout', {
    title: 'Sell',
    body: 'sell'
  });
});

router.get('/properties', (req, res) => {
  res.render('layout', {
    title: 'Properties',
    body: 'listings'
  });
});

export default router;