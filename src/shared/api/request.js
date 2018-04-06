const url = require('url');

module.exports = async httpRequest => {
  const parsedUrl = url.parse(httpRequest.url, true);
  const splittedPathname = parsedUrl.pathname.split('/');

  const res = await getContent(httpRequest);
  let data = undefined;
  if (res) {
    try {
      data = JSON.parse(res);
    } catch (e) {}
  }

  return {
    resourceName: splittedPathname[1],
    id: splittedPathname[2],
    method: httpRequest.method,
    order: parsedUrl.query.o || parsedUrl.query.order,
    data: data,
  };
};

// Private
// -------

function getContent(req) {
  let data = '';

  return new Promise(resolve => {
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      resolve(data);
    });
  });
}
