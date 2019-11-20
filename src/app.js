import express from 'express';
import 'express-async-errors'; // importar antes das rotas
import Youch from 'youch';

import routes from './routes';
import './database';
import path from 'path';

import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    // sentry - The request handler must be the first middleware on the app
    this.server.use(Sentry.Handlers.requestHandler());

    this.server.use(express.json());
    // permitir visualizar imagens dos avatars
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    // express entende que métodos que recebem 4 parametros é middleware de exceção
    this.server.use(async (err, req, res, next) => {
      const errors = await new Youch(err, req).toJSON(); // .toHTML()
      return res.status(500).json(errors);
    });
  }
}

// module.exports = new App().server;
export default new App().server;
