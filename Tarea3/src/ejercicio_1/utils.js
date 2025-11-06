export function suma(a, b) {
  return a + b;
}
export function resta(a, b) {
  return a - b;
}
export function multiplica(a, b) {
  return a * b;
}
export function divide(a, b) {
  if (b === 0) throw new Error('No se puede dividir entre cero');
  return Number(a) / Number(b);
}

export default { suma, resta, multiplica, divide };