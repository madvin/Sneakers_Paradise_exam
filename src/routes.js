import { Router } from 'express';
import router from './controllers/homeController.js';
import authController from './controllers/authController.js';

const routes = Router();

// TODO: define routes

routes.use(router);
routes.use('/auth', authController);

routes.get('*', (req, res) => {
    res.render('404');
});

export default routes;