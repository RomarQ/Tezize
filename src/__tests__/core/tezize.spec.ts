import fs from 'fs';
import { Parser } from '@taquito/michel-codec';
import { calculateSize } from '../../index';

beforeEach(() => {});

describe('Tezize module', () => {
  it('Calculate Contract Size', () => {
    const contract = fs.readFileSync('src/__tests__/contracts/contract_2.tz', 'utf8');
    const parser = new Parser();
    const json = parser.parseScript(contract);

    expect(calculateSize(json as Micheline)).toBe(1071);
  });
});
