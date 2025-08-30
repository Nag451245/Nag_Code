const request = require('supertest');
const app = require('../src/server');

describe('Chitti API', () => {
  it('requires phone for login', async () => {
    const res = await request(app).post('/login').send({});
    expect(res.status).toBe(400);
  });

  it('returns otp on login', async () => {
    const res = await request(app).post('/login').send({ phone: '123' });
    expect(res.status).toBe(200);
    expect(res.body.otp).toBe('123456');
  });

  it('creates and retrieves a chitti', async () => {
    const createRes = await request(app)
      .post('/chittis')
      .send({ name: 'Test', amount: 1000, duration: 10, members: 5 });
    expect(createRes.status).toBe(201);
    const id = createRes.body.id;

    const listRes = await request(app).get('/chittis');
    expect(listRes.body.length).toBe(1);

    const getRes = await request(app).get(`/chittis/${id}`);
    expect(getRes.body.name).toBe('Test');
  });
});
