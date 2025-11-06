import request from 'supertest';
import { describe, test, expect } from '@jest/globals';
import jwt from 'jsonwebtoken';
import app from '../index.js';

const SECRET = 'testsecret';

describe('Ejercicio 2: endpoints /test y /admin', () => {
  test('GET /test → 200 y { mensaje: "ok" }', async () => {
    const res = await request(app).get('/test');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ mensaje: 'ok' });
  });

  test('GET /admin → 401 sin token', async () => {
    const res = await request(app).get('/admin');
    expect(res.status).toBe(401);
  });

  test('GET /admin → 200 y { mensaje: "ok" } con token válido', async () => {
    const token = jwt.sign({ id: 1, role: 'admin' }, SECRET, { expiresIn: '1h' });
    const res = await request(app)
      .get('/admin')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ mensaje: 'ok' });
  });
});
