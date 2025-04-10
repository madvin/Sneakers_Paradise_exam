import { Router } from 'express';
import sneakersService from '../services/sneakersService.js';
import { isAuth } from '../middlewares/authMiddlewares.js';
import { getErrorMessage } from '../utils/errorUtils.js';

const sneakersController = Router();

sneakersController.get('/create', isAuth, (req, res) => {
    res.render('sneakers/create');
});

export default sneakersController;