import http from 'http'
import * as prev from './shared/middlewares';

const log = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};

console.log('toto');

prev.add(log);

(async () => {
  try {
    const { httpPort } = await require('../config')();

    let server = http.createServer(async function(req, res) {
      prev.exec(req, res);
      res.end();
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
