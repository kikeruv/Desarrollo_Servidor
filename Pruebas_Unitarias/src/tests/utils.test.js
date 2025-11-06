import { suma, resta, multiplica, divide } from '../utils.js';

describe('Utils: operaciones básicas', () => {

  test('suma', () => {
    expect(suma(2, 3)).toBe(5);
  });
  
  test('resta', () => {
    expect(resta(5, 2)).toBe(3);
  });

  test('multiplica', () => {
    expect(multiplica(3, 4)).toBe(12)
  });

  test('divide', () => {
    expect(divide(10, 2)).toBe(5)
  });
  
  test('divide entre 0 lanza error', () => {
    expect(() => divide(1, 0)).toThrow('No se puede dividir entre cero');
  });
});
