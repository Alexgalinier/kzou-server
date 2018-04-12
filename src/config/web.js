import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'production') {
  dotenv.config();
}

const { HTTP_HEADER_ORIGIN, PORT, SECRET, SALT_ROUNDS } = process.env;

export default () => ({
  httpPort: PORT ? PORT : 3000,
  httpHeaderOrigin: HTTP_HEADER_ORIGIN ? HTTP_HEADER_ORIGIN : '*',
  secret: SECRET ? SECRET : '1234567890',
  saltRounds: SALT_ROUNDS ? SALT_ROUNDS : 10,
});
