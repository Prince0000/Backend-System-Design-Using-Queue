const request = require('supertest');
const app = require('../server');

describe('Authentication Tests', () => {
  it('should register a new user', async () => {
    const response = await request(app).post('/register').send({ username: 'testuser', password: 'testpass' });
    expect(response.statusCode).toBe(200);
  });

  it('should login an existing user', async () => {
    const response = await request(app).post('/login').send({ username: 'testuser', password: 'testpass' });
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
