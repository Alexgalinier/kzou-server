import dotenv from 'dotenv';
import * as memoryDB from './../shared/db/db-memory';
import * as mongoDB from './../shared/db/db-mongo';

if (process.env.NODE_ENV === 'production') {
  dotenv.config();
}

const initialize = async db => {
  await db.insert('students', {
    lastname: 'Galinier',
    firstname: 'Mélissandre',
  });
  await db.insert('students', {
    lastname: 'Galinier',
    firstname: 'Mylène',
  });
  await db.insert('students', {
    lastname: 'Galinier',
    firstname: 'Alexandre',
  });
  await db.insert('students', {
    lastname: 'Jodorowski',
    firstname: 'Alejandro',
  });
  await db.insert('users', {
    username: 'a',
    hash: '$2b$10$i48VrWcXiUczU5LYkTSbjed5jewZRdKGofE08PAU3sXTni2AKANXC',
    test: 'toto',
  });
};

const { BD_USER, BD_PASSWORD, BD_NAME } = process.env;

export default async () => {
  let db;

  if (BD_USER && BD_PASSWORD && BD_NAME) {
    try {
      db = mongoDB;
      await db.connect(`mongodb://${BD_USER}:${BD_PASSWORD}@ds229388.mlab.com:29388/${BD_NAME}`, BD_NAME);
    } catch (e) {
      throw new Error('Database failed to start');
    }
  } else {
    db = memoryDB;
    await initialize(db);
  }

  return {
    db,
  };
};
