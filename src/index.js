import * as server from './shared/server';
import log from './hooks/log';
import accessControl from './hooks/access-control';
import config from './config';
import * as Auth from './shared/auth';
import * as Encrypt from './shared/encrypt';
// Routes
import login from './routes/login';
import students from './routes/students';
import users from './routes/users';

(async () => {
  const { httpPort, httpHeaderOrigin, db, secret, saltRounds } = await config();

  Auth.config({ secret });
  Encrypt.config({ saltRounds });

  server.before(log);
  server.before(accessControl(httpHeaderOrigin));

  server.config({ db });
  server.routes(login);
  server.routes(students);
  server.routes(users);

  server.start(httpPort);
})();
