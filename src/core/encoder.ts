// Load Polyfill
import '../polyfill/TextEncoder';
// -- Imports
import { numberToZarith, bufferToHex } from '../utils/encoder';
import { codeOfPrim, primOfString, codeArgsAnnot, Prim } from '../utils/primitives';

const nodeEncoding = {
  int_encoding: '00',
  string_encoding: '01',
  seq_encoding: '02',
  application_encoding: '09',
  bytes_encoding: '0A',
};

/**
 * Parses the contract JSON representation to its byte representation.
 * @param {Micheline} micheline contract JSON representation.
 * @returns {string} byte representation.
 */
export const encodeMichelineJSON = (micheline: Micheline): string => {
  let byteString: string[] = [];
  switch (true) {
    case micheline instanceof Array:
      {
        const bytes = (micheline as Micheline[])
          .map((token) => encodeMichelineJSON(token))
          .join('');
        byteString = [
          nodeEncoding['seq_encoding'],
          (bytes.length / 2).toString(16).padStart(8, '0'),
          bytes,
        ];
      }
      break;
    case micheline instanceof Object: {
      if (micheline.int) {
        byteString = [nodeEncoding['int_encoding'], numberToZarith(Number(micheline.int))];
      } else if (micheline.string) {
        const string_bytes = new TextEncoder().encode(micheline.string);
        byteString = [
          nodeEncoding['string_encoding'],
          string_bytes.length.toString(16).padStart(8, '0'),
          [...string_bytes].map((x) => x.toString(16).padStart(2, '0')).join(''),
        ];
      } else if (micheline.prim) {
        if (micheline.prim == Prim.I_LAMBDA) {
          let argsEnc = '';
          if (micheline.args) {
            const recResult = micheline.args.map((arg) => encodeMichelineJSON(arg)).join('');
            argsEnc = `${(recResult.length / 2).toString(16).padStart(8, '0')}${recResult}`;
          }

          let annotBytes = '';
          if (micheline.annots) {
            const annotEnc = micheline.annots
              .map((annot) => bufferToHex(new TextEncoder().encode(annot)))
              .join('20');

            annotBytes = `${(annotEnc.length / 2).toString(16).padStart(8, '0')}${annotEnc}`;
          }

          byteString = [
            nodeEncoding['application_encoding'],
            codeOfPrim[primOfString[micheline.prim]],
            argsEnc,
            annotBytes,
          ];
        } else {
          const argsSize = (micheline.args && micheline.args.length) || 0;

          let argsEnc = '';
          if (micheline.args) {
            argsEnc = micheline.args.map((arg) => encodeMichelineJSON(arg)).join('');
          }

          let annotBytes = '';
          if (micheline.annots) {
            const annotEnc = micheline.annots
              .map((annot) => bufferToHex(new TextEncoder().encode(annot)))
              .join('20');

            annotBytes = `${(annotEnc.length / 2).toString(16).padStart(8, '0')}${annotEnc}`;
          }

          byteString = [
            codeArgsAnnot[argsSize][String(!!micheline.annots)],
            codeOfPrim[primOfString[micheline.prim]],
            argsEnc,
            annotBytes,
          ];
        }
      } else if (micheline.bytes) {
        let bytes = micheline.bytes || '';

        byteString = [
          nodeEncoding['bytes_encoding'],
          (bytes.length / 2).toString(16).padStart(8, '0'),
          bytes,
        ];
      }
    }
  }
  return byteString.join('');
};
