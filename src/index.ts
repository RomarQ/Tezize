import { encodeMichelineJSON } from './core/encoder';

export const calculateSize = (json: Micheline) => {
  let bytes = '';
  try {
    if (typeof json === 'string') {
      bytes = encodeMichelineJSON(JSON.parse(json));
    } else {
      bytes = encodeMichelineJSON(json);
    }
  } catch (e) {
    console.error(e);
  }
  return bytes.length / 2;
};
