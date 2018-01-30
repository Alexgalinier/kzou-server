const _ = require('lodash');
const shortId = require('shortid');

let data = {};

module.exports = {
  getAll: async name => Promise.resolve(data[name]),
  get: async function(name, id) {
    if (!data[name]) return Promise.resolve(undefined);

    return Promise.resolve(data[name].find(obj => obj._id === id));
  },
  insert: async (name, newEntry) => {
    if (!data[name]) data[name] = [];

    newEntry._id = shortId.generate();
    data[name].push(newEntry);

    return Promise.resolve(newEntry);
  },
  update: async (name, id, newValues) => {
    if (!data[name]) return Promise.resolve(undefined);

    const index = data[name].findIndex(obj => obj._id === id);

    if (index < 0) return Promise.resolve(undefined);

    data[name][index] = _.merge(data[name][index], newValues);
    return Promise.resolve(data[name][index]);
  },
  delete: async (name, id) => {
    if (!data[name]) return Promise.resolve(undefined);

    const index = data[name].findIndex(obj => obj._id === id);

    if (index < 0) return Promise.resolve(undefined);

    const deletedObj = data[name].splice(index, 1);
    return Promise.resolve(deletedObj[0]);
  },
};
