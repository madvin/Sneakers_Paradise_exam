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
})

export default sneakersController;