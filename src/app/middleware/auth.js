import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  //console.log(authHeader);

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // 'bearer xxxxx'
  // [' bearer', 'token']
  // descarta a primeira string
  const [, token] = authHeader.split(' ');

  try {
    // poderia fazer usando callback
    /**
    jwt.verify(token, secret, (err, result) ={
    });
    */
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // console.log(decoded); // { id: 3, iat: 1573824215, exp: 1574429015 }
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
