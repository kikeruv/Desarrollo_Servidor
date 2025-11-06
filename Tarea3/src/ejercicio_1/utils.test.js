import { describe, test, expect } from '@jest/globals';
import { suma, resta, multiplica, divide } from './utils.js';

describe('Ejercicio 1: utils.js', () => {
  describe('suma', () => {
    test('suma números enteros', () => {
      expect(suma(2, 3)).toBe(5);
    });
  });

  describe('resta', () => {
    test('resta números', () => {
      expect(resta(10, 4)).toBe(6);
    });
    test('funciona con negativos y decimales', () => {
      expect(resta(-2.5, 1.5)).toBe(-4);
    });
  });

  describe('multiplica', () => {
    test('multiplica números', () => {
      expect(multiplica(3, 5)).toBe(15);
    });
    test('multiplica por cero', () => {
      expect(multiplica(9, 0)).toBe(0);
    });
  });

  describe('divide', () => {
    test('divide números', () => {
      expect(divide(10, 2)).toBe(5);
    });
    test('lanza error si se divide entre cero', () => {
      expect(() => divide(10, 0)).toThrow('No se puede dividir entre cero');
    });
  });
});
