import * as Auth from './../../shared/auth';
import * as Rest from './../../shared/rest';

export default ({ all, get, post, put, _delete, config }) => {
  all('students', (req, res, next) => Auth.check(req, res, next));
  get('students', (req, res) => Rest.get(req, res, config.db));
  post('students', (req, res) => Rest.post(req, res, config.db));
  put('students', (req, res) => Rest.put(req, res, config.db));
  _delete('students', (req, res) => Rest.remove(req, res, config.db));
};
