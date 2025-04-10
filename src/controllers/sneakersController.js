import { Router } from 'express';
import sneakersService from '../services/sneakersService.js';
import { isAuth } from '../middlewares/authMiddlewares.js';
import { getErrorMessage } from '../utils/errorUtils.js';

const sneakersController = Router();

sneakersController.get('/', async (req, res) => {
    try {
        const latestSneakers = await sneakersService.getLatest(); 
        res.render('home', { latestSneakers });
    } catch (err) {
        return res.render('/', {
            error: getErrorMessage(err)
        })
    }
});

sneakersController.get('/catalog', async (req, res) => {
    try {
        const sneakers = await sneakersService.getAll(); 
        res.render('catalog', { sneakers });
    } catch (err) {
        return res.render('/catalog', {
            error: getErrorMessage(err)
        })
    }
});

sneakersController.get('/create', isAuth, (req, res) => {
    res.render('sneakers/create');
});

sneakersController.post('/create', isAuth, async (req, res) => {
    const sneakersData = req.body;
    const userId = req.user?.id;

    try {
        await sneakersService.create(sneakersData, userId);
    } catch (err) {
        return res.render('sneakers/create', {
            sneakers: sneakersData,
            error: getErrorMessage(err)
        })
    }
    res.redirect('/');
});

sneakersController.get('/details/:id', async (req, res) => {
    const id = req.params.id;
    const sneaker = await sneakersService.getOne(id);

    if (!sneaker) {
        return res.render('404', { error: 'Sneaker not found!' });
    }
    res.render('sneakers/details', { sneaker });
});
sneakersController.get('/edit/:id', isAuth, async (req, res) => {
    const id = req.params.id;
    const sneaker = await sneakersService.getOne(id);

    if (!sneaker) {
        return res.render('404', { error: 'Sneaker not found!' });
    }
    res.render('sneakers/edit', { sneaker });
});
sneakersController.post('/edit/:id', isAuth, async (req, res) => {
    const id = req.params.id;
    const sneakersData = req.body;

    try {
        await sneakersService.update(id, sneakersData);
    } catch (err) {
        return res.render('sneakers/edit', {
            sneakers: sneakersData,
            error: getErrorMessage(err)
        })
    }
    res.redirect(`/sneakers/details/${id}`);
});

export default sneakersController;