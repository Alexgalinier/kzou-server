import jwt from 'jsonwebtoken';

let authConfig = {
  secret: 'should-be-changed',
  maxAge: '1h',
};

export const config = aConfig => {
  authConfig = { ...authConfig, aConfig };
};
export const token = data => jwt.sign(data, authConfig.secret);
export const check = (req, res, next) => {
  try {
    if (!req.headers || !req.headers['authorization']) throw new Error('Header authorization not defined');

    const token = req.headers['authorization'].replace('Bearer ', '');

    const authData = jwt.verify(token, authConfig.secret, { maxAge: authConfig.maxAge });

    if (next !== undefined) {
      next({ ...req, authData }, res);
    } else {
      return authData;
    }
  } catch (e) {
    if (next !== undefined) {
      res.error(401);
    } else {
      return false;
    }
  }
};
