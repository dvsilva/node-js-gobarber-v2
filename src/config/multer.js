import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    // base/src/raiz_projeto/tmp/uploads
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return callback(err);
        // file.originalname // nome que do arquivo do usuário
        return callback(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
