import { Router } from 'express';
import sneakersService from '../services/sneakersService.js';
import { isAuth } from '../middlewares/authMiddlewares.js';
import { getErrorMessage } from '../utils/errorUtils.js';

const sneakersController = Router();

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

sneakersController.get('/delete/:id', isAuth, async (req, res) => {
    const id = req.params.id;
    const sneaker = await sneakersService.getOne(id);
    const hasLiked = sneaker.likes.includes(req.user.id);
    const isOwner = sneaker.owner == req.user.id;
    
    if (!sneaker) {
        await sneakersService.remove(id);
    }
    res.render('sneakers/catalog', { 
        sneaker, 
        isOwner, 
        hasLiked, 
        isLoggedIn: isAuth 
    });
 
});

sneakersController.get('/details/:id', isAuth, async (req, res) => {
    const id = req.params.id;
    const sneaker = await sneakersService.getOne(id);

    if (!sneaker) {
        return res.render('404', { error: 'Sneaker not found!' });
    }

    const isOwner = isAuth && sneaker.owner?.toString() === req.user.id;
    const hasLiked = isAuth && sneaker.likes.includes(req.user.id);

    res.render('sneakers/details', {
        sneaker,
        isLoggedIn: isAuth,
        isOwner,
        hasLiked,
    });
});

sneakersController.get('/like/:id', isAuth, async (req, res) => {
    const sneakerId = req.params.id;
    const userId = req.user.id;

    try {
        await sneakersService.like(sneakerId, userId);
        res.redirect(`/sneakers/details/${sneakerId}`);
    } catch (err) {
        res.render('404', { error: 'Failed to like sneaker' });
    }
});

export default sneakersController;