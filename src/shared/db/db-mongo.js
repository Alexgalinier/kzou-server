const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

module.exports = async (dbServer, dbName) => {
  try {
    let client = await MongoClient.connect(dbServer);
    const db = client.db(dbName);
    return dbApi(db);
  } catch (e) {
    console.error('MongoClient error occured', e);
    throw new Error(e);
  }
};

function dbApi(db) {
  return {
    getAll: async name => {
      try {
        return (await db.collection(name).find({})).toArray();
      } catch (e) {
        console.log(e.stack);
      }
    },
    get: async function(name, id) {
      try {
        return await db.collection(name).findOne({ _id: ObjectID(id) });
      } catch (e) {
        console.log(e.stack);
      }
    },
    insert: async (name, newEntry) => {
      try {
        return await db.collection(name).insertOne(newEntry);
      } catch (e) {
        console.log(e.stack);
      }
    },
    update: async (name, id, newValues) => {
      try {
        delete newValues['_id'];
        console.log(name, id, newValues);
        return await db
          .collection(name)
          .findOneAndUpdate({ _id: ObjectID(id) }, { $set: newValues });
      } catch (e) {
        console.log(e.stack);
      }
    },
    delete: async (name, id) => {
      try {
        return await db
          .collection(name)
          .findOneAndDelete({ _id: ObjectID(id) });
      } catch (e) {
        console.log(e.stack);
      }
    },
  };
}
