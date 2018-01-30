const entry1 = { name: 'Jose' };
const entry2 = { name: 'Mylene' };
const db = require('./db-memory');

test('insert', async () => {
  const newEntry = await db.insert('test', entry1);

  expect(newEntry.name).toBe('Jose');
  expect(newEntry._id).toBeDefined();
});

test('get', async () => {
  const newEntry = await db.insert('test', entry2);

  expect(await db.get('notCreatedName', newEntry._id)).toEqual(undefined);
  expect(await db.get('test', newEntry._id)).toBeDefined();
  expect((await db.get('test', newEntry._id)).name).toBe('Mylene');
});

test('getAll', async () => {
  expect(await db.getAll('notCreatedName')).toBeUndefined();
  expect(await db.getAll('test')).toHaveLength(2);
  expect((await db.getAll('test'))[1].name).toBe('Mylene');
});

test('update', async () => {
  const objToUpdate = (await db.getAll('test'))[0];

  expect(
    await db.update('notCreatedName', objToUpdate._id, { name: 'Arnold' })
  ).toBeUndefined();

  const res = await db.update('test', objToUpdate._id, { name: 'Arnold' });
  expect(res).toBeDefined();
  expect(res.name).toBe('Arnold');
  expect((await db.get('test', res._id)).name).toBe('Arnold');
  expect(await db.getAll('test')).toHaveLength(2);
});

test('delete', async () => {
  const objToDelete = (await db.getAll('test'))[0];

  expect(await db.delete('notCreatedName', objToDelete._id)).toBeUndefined();

  const res = await db.delete('test', objToDelete._id);

  expect(res).toBeDefined();
  expect(res.name).toBe('Arnold');
  expect(await db.get('test', res._id)).toBeUndefined();
  expect(await db.getAll('test')).toHaveLength(1);
});
