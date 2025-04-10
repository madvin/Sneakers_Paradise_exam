import { Router } from 'express';
import sneakersService from '../services/sneakersService.js';

const router = Router();

router.get('/', (req, res) => {
    const sneakers = sneakersService.getLatest();
    res.render('home', { sneakers });
});

router.get('/about', (req, res) => {
    res.render('about');
});

export default router;