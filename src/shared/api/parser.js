const Request = require('./request');
const Response = require('./response');
const _ = require('lodash');

module.exports = resources => async (req, res, db) => {
  const request = await Request(req);
  const response = Response(res);

  const resource = resources.find(item => item.name == request.resourceName);

  if (!resource) return response.error(404);

  switch (request.method) {
    case 'GET':
      get(request, response, resource, db);
      break;
    case 'POST':
      post(request, response, resource, db);
      break;
    case 'PUT':
      put(request, response, resource, db);
      break;
    case 'DELETE':
      del(request, response, resource, db);
      break;
    case 'OPTIONS':
      response.ok();
      break;
  }
};

async function get(request, response, resource, db) {
  if (request.id) {
    const res = await db.get(resource.name, request.id);
    res ? response.send(res) : response.error(404);
  } else {
    let res = await db.getAll(resource.name);

    if (res && request.order) {
      res = _.orderBy(res, request.order);
    }

    res ? response.send(res) : response.send([]);
  }
}

async function post(request, response, resource, db) {
  response.send(await db.insert(resource.name, request.data), 201);
}

async function put(request, response, resource, db) {
  const res = await db.update(resource.name, request.id, request.data);

  res ? response.send(res) : response.error(404);
}

async function del(request, response, resource, db) {
  const res = await db.delete(resource.name, request.id);

  res ? response.send(res) : response.error(404);
}
