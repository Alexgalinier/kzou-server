const http = require('http');
const Parser = require('./src/shared/api/parser');

// Init
(async () => {
  try {
    const { db, httpPort, httpHeaderOrigin } = await require('./config')();

    const parser = Parser([
      require('./src/schemas/students'),
      require('./src/schemas/classrooms'),
      require('./src/schemas/levels'),
    ]);

    let server = http.createServer(async function(req, res) {
      console.log(req.method, req.url);

      res.setHeader('Access-Control-Allow-Origin', httpHeaderOrigin);
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, DELETE'
      );
      res.setHeader('Access-Control-Allow-Credentials', false);

      if (req.method !== 'OPTIONS') {
        res.setHeader('Content-Type', 'application/json');
      }

      if (req.url === '/login') {
        const content = await getContent(req);
        const loginData = JSON.parse(content);

        console.log(loginData.username);
        console.log(loginData.password);

        res.end();
      }

      parser(req, res, db);
    });

    server.listen(httpPort);
    server.on('listening', () =>
      console.log(`Server started, listen on port : ${httpPort}`)
    );
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

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
