export function suma(a, b) {
  return Number(a) + Number(b);
}
export function resta(a, b) {
  return Number(a) - Number(b);
}
export function multiplica(a, b) {
  return Number(a) * Number(b);
}
export function divide(a, b) {
  if (b === 0) throw new Error('No se puede dividir entre cero');
  return Number(a) / Number(b);
}
