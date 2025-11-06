import request from 'supertest';
import app from '../index.js';
import jwt from 'jsonwebtoken';

describe('GET /test', () => {
  test('200 y {mensaje:"ok"}', async () => {
    const res = await request(app).get('/test');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ mensaje: 'ok' });
  });
});

describe('GET /admin', () => {
  test('401 sin token', async () => {
    const res = await request(app).get('/admin');
    expect(res.status).toBe(401);
  });

  test('401 token inválido', async () => {
    const res = await request(app)
      .get('/admin')
      .set('Authorization', 'Bearer token-falso');
    expect(res.status).toBe(401);
  });

  test('200 con token válido', async () => {
    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET || 'testsecret', {
      expiresIn: '5m'
    });
    const res = await request(app)
      .get('/admin')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ mensaje: 'ok' });
  });
});
