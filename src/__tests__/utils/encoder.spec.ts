import { numberToZarith } from '../../utils/encoder';

describe('Utils - Encoder', () => {
  it('Number to Zarith', () => {
    expect(numberToZarith(0)).toBe('00');
    expect(numberToZarith(1)).toBe('01');
    expect(numberToZarith(12)).toBe('0c');
    expect(numberToZarith(123)).toBe('7b');
    expect(numberToZarith(1234)).toBe('d209');
    expect(numberToZarith(12345)).toBe('b960');
    expect(numberToZarith(123456)).toBe('c0c407');
    expect(numberToZarith(1234567)).toBe('87ad4b');
    expect(numberToZarith(12345678)).toBe('cec2f105');
    expect(numberToZarith(123456789)).toBe('959aef3a');
    expect(numberToZarith(987654321)).toBe('b1d1f9d603');
    expect(numberToZarith(9870004321)).toBe('e1a0b1e224');
  });
});
