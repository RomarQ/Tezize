export const numberToZarith = (value: number) => {
  let val = value;
  let zarith = '';

  while (true) {
    if (val >= 128) {
      let mod = val % 128;
      val -= mod;
      val /= 128;
      mod += 128;
      zarith += mod.toString(16);
    } else {
      if (val < 16) {
        zarith += '0';
      }
      zarith += val.toString(16);
      break;
    }
  }
  return zarith;
};

export const bufferToHex = (buffer: Uint8Array) =>
  buffer.reduce((state, val) => `${state}${val.toString(16).padStart(2, '0')}`, '');
