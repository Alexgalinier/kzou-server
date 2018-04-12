import dbConfig from './db';
import webConfig from './web';

export default async () => {
  const web = webConfig();
  const db = await dbConfig();

  return {
    ...web,
    ...db,
  };
};
