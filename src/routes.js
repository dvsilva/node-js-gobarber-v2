import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Forma de usar o middleware 1 - definindo local
//routes.put('/users', authMiddleware, UserController.update);

// Forma de usar o middleware 2 - valendo pra rotas após
routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

/**
routes.post('/files', upload.single('file'), (req, res) => {
  // req.file
   {
    "fieldname": "file",
    "originalname": "banco-tama-ht10s-rhythm-mate-drum-throne-compacto-e-mais-leve4381..jpg",
    "encoding": "7bit",
    "mimetype": "image/jpeg",
    "destination": "C:\\Users\\danyl\\OneDrive\\Desktop\\Rocketseat\\bootcamp 2\\nodejs\\gobarber-v2\\tmp\\uploads",
    "filename": "5131e1e5f737e720d407b00f7bd74f14.jpg",
    "path": "C:\\Users\\danyl\\OneDrive\\Desktop\\Rocketseat\\bootcamp 2\\nodejs\\gobarber-v2\\tmp\\uploads\\5131e1e5f737e720d407b00f7bd74f14.jpg",
    "size": 39717
  }
  return res.json(req.file);
});
*/

routes.get('/providers', ProviderController.index);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);

routes.get('/schedule', ScheduleController.index);

export default routes;
