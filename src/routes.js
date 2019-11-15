import { Router } from 'express';
//import User from './app/models/User';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Forma de usar o middleware 1 - definindo local
//routes.put('/users', authMiddleware, UserController.update);

// Forma de usar o middleware 2 - valendo pra rotas após
routes.use(authMiddleware);
routes.put('/users', UserController.update);

/**
routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Diego Fernandes',
    email: 'diego@rocketseat.com.br',
    password_hash: '123123',
  });

  return res.json(user);
});
 */

// module.exports = routes;
export default routes;
