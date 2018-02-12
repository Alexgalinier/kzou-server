if (process.env.NODE_ENV === 'production') {
  require('dotenv').config();
}

const { BD_USER, BD_PASSWORD, BD_NAME, HTTP_HEADER_ORIGIN, PORT } = process.env;

module.exports = async () => {
  let config = {};

  config.httpPort = PORT ? PORT : 3000;
  config.httpHeaderOrigin = HTTP_HEADER_ORIGIN ? HTTP_HEADER_ORIGIN : '*';

  if (BD_USER && BD_PASSWORD && BD_NAME) {
    try {
      config.db = await require('./lib/db/db-mongo')(
        `mongodb://${BD_USER}:${BD_PASSWORD}@ds229388.mlab.com:29388/kzou`,
        BD_NAME
      );
    } catch (e) {
      throw new Error('Database failed to start');
    }
  } else {
    config.db = require('./lib/db/db-memory');
    await config.db.insert('students', {
      lastname: 'Galinier',
      firstname: 'Mélissandre',
    });
    await config.db.insert('students', {
      lastname: 'Galinier',
      firstname: 'Mylène',
    });
    await config.db.insert('students', {
      lastname: 'Galinier',
      firstname: 'Alexandre',
    });
    await config.db.insert('students', {
      lastname: 'Jodorowski',
      firstname: 'Alejandro',
    });
  }

  return config;
};
