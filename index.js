const http = require('http');
const Parser = require('./lib/api/parser');

// Init
(async () => {
  try {
    const {
      isProd,
      db,
      httpPort,
      httpHeaderOrigin,
    } = await require('./config')();

    if (!isProd) {
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
    }

    const parser = Parser([require('./app/students')]);

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
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
