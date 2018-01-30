const isProd = process.env.NODE_ENV === 'production';
if (isProd) {
  require('dotenv').config();
}

const { BD_USER, BD_PASSWORD, BD_NAME, HTTP_HEADER_ORIGIN } = process.env;

module.exports = async () => {
  let config = {};

  config.isProd = isProd;
  config.httpPort = 3000;
  config.httpHeaderOrigin = '*';
  config.db = require('./lib/db/db-memory');

  if (isProd) {
    config.httpHeaderOrigin = HTTP_HEADER_ORIGIN;

    try {
      config.db = await require('./lib/db/db-mongo')(
        `mongodb://${BD_USER}:${BD_PASSWORD}@ds229388.mlab.com:29388/kzou`,
        BD_NAME
      );
    } catch (e) {
      throw new Error('Database failed to start');
    }
  }

  return config;
};
