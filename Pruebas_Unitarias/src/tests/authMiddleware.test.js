// src/tests/authMiddleware.test.js
import { jest } from '@jest/globals';           
import { auth } from '../middleware/auth.js';
import jwt from 'jsonwebtoken';

describe('auth', () => {
  const OLD_SECRET = process.env.JWT_SECRET;

  beforeEach(() => {
    process.env.JWT_SECRET = 'testsecret';
  });

  afterAll(() => {
    process.env.JWT_SECRET = OLD_SECRET;
  });

  test('next() con token válido', () => {
    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET);

    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    auth(req, res, next);

    expect(req.user).toBeDefined();
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  test('401 sin header Authorization', () => {
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token requerido' });
    expect(next).not.toHaveBeenCalled();
  });
});
