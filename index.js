const http = require('http');
const Parser = require('./lib/api/parser');

// Init
(async () => {
  try {
    const { db, httpPort, httpHeaderOrigin } = await require('./config')();

    const parser = Parser([
      require('./app/students'),
      require('./app/classrooms'),
      require('./app/levels'),
    ]);

    let server = http.createServer(function(req, res) {
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
