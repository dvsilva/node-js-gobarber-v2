import express from 'express';
import routes from './routes';
import './database';
import path from 'path';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    // permitir visualizar imagens dos avatars
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

// module.exports = new App().server;
export default new App().server;
