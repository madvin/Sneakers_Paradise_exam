import { Router } from 'express';
import sneakersService from '../services/sneakersService.js';
import { getErrorMessage } from '../utils/errorUtils.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const latestSneakers = await sneakersService.getLatest(); 
        res.render('home', { latestSneakers });
    } catch (err) {
        return res.render('/', {
            error: getErrorMessage(err)
        })
    }
});

router.get('/catalog', async (req, res) => {
    try {
        const sneakers = await sneakersService.getAll(); 
        res.render('catalog', { sneakers });
    } catch (err) {
        return res.render('/catalog', {
            error: getErrorMessage(err)
        })
    }
});

router.get('/about', (req, res) => {
    res.render('about');
});

export default router;