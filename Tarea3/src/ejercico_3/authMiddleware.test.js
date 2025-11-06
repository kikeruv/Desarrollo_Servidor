import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import jwt from 'jsonwebtoken';
import { auth } from './auth.js';

const SECRET = 'testsecret';

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json  = jest.fn().mockReturnValue(res);
  return res;
}

let nextFn;

beforeEach(() => {
  nextFn = jest.fn();
});

describe('Ejercicio 3: auth middleware', () => {
  test('401 si no existe Authorization', () => {
    const req = { headers: {} };
    const res = mockRes();
    auth(req, res, nextFn);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token requerido' });
    expect(nextFn).not.toHaveBeenCalled();
  });

  test('401 si el formato es inválido', () => {
    const req = { headers: { authorization: 'Bearer' } };
    const res = mockRes();
    auth(req, res, nextFn);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Formato de token inválido' });
    expect(nextFn).not.toHaveBeenCalled();
  });

  test('401 si el token es inválido', () => {
    const req = { 
      headers: { 
        authorization: 'Bearer abc.def.ghi' 
      } 
    };

    const res = mockRes();
    auth(req, res, nextFn);
    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith(
      { error: 'Token inválido' }
    );

    expect(nextFn).not.toHaveBeenCalled();
  });

  test('next y req.user si el token es válido', () => {
    const payload = { 
      id: 123, role: 'admin' 
    };
    const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });

    const req = { 
      headers: { authorization: `Bearer ${token}` } 
    };
    const res = mockRes();

    auth(req, res, nextFn);

    expect(nextFn).toHaveBeenCalledTimes(1);
    expect(req.user).toMatchObject(payload);
  });
});
