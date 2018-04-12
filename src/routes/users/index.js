import * as Encrypt from './../../shared/encrypt';

export default ({ post, config }) => {
  post('users', async (req, res) => {
    const { username, password } = req.data;
    const { db } = config;

    if (!username || !password) return res.error(400, 'You must provide a username and password value');

    const user = await db.find('users', 'username', username);

    if (user) return res.error(409, `Username: ${username}, already exists`);

    const hashedPassword = await Encrypt.hash(password);

    res.send(await db.insert('users', { username, hash: hashedPassword }), 201);
  });
};
