import { Router } from 'express';
import router from './controllers/homeController.js';
import authController from './controllers/authController.js';
import sneakersController from './controllers/sneakersController.js';

const routes = Router();

// TODO: define routes

routes.use(router);
routes.use('/auth', authController);
routes.use('/sneakers', sneakersController);

routes.get('*', (req, res) => {
    res.render('404');
});

export default routes;