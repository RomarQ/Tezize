/* === Version: 0.0.1 === */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

if (typeof global.TextEncoder == 'undefined') {
    global.TextEncoder = function TextEncoder() { };
    global.TextEncoder.prototype.encode = function encode(str) {
        var Len = str.length, resPos = -1;
        // The Uint8Array's length must be at least 3x the length of the string because an invalid UTF-16
        //  takes up the equivelent space of 3 UTF-8 characters to encode it properly. However, Array's
        //  have an auto expanding length and 1.5x should be just the right balance for most uses.
        var resArr = typeof Uint8Array === 'undefined' ? new Array(Len * 1.5) : new Uint8Array(Len * 3);
        for (var point = 0, nextcode = 0, i = 0; i !== Len;) {
            (point = str.charCodeAt(i)), (i += 1);
            if (point >= 0xd800 && point <= 0xdbff) {
                if (i === Len) {
                    resArr[(resPos += 1)] = 0xef /*0b11101111*/;
                    resArr[(resPos += 1)] = 0xbf /*0b10111111*/;
                    resArr[(resPos += 1)] = 0xbd /*0b10111101*/;
                    break;
                }
                // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                nextcode = str.charCodeAt(i);
                if (nextcode >= 0xdc00 && nextcode <= 0xdfff) {
                    point = (point - 0xd800) * 0x400 + nextcode - 0xdc00 + 0x10000;
                    i += 1;
                    if (point > 0xffff) {
                        resArr[(resPos += 1)] = (0x1e /*0b11110*/ << 3) | (point >>> 18);
                        resArr[(resPos += 1)] = (0x2 /*0b10*/ << 6) | ((point >>> 12) & 0x3f) /*0b00111111*/;
                        resArr[(resPos += 1)] = (0x2 /*0b10*/ << 6) | ((point >>> 6) & 0x3f) /*0b00111111*/;
                        resArr[(resPos += 1)] = (0x2 /*0b10*/ << 6) | (point & 0x3f) /*0b00111111*/;
                        continue;
                    }
                }
                else {
                    resArr[(resPos += 1)] = 0xef /*0b11101111*/;
                    resArr[(resPos += 1)] = 0xbf /*0b10111111*/;
                    resArr[(resPos += 1)] = 0xbd /*0b10111101*/;
                    continue;
                }
            }
            if (point <= 0x007f) {
                resArr[(resPos += 1)] = (0x0 /*0b0*/ << 7) | point;
            }
            else if (point <= 0x07ff) {
                resArr[(resPos += 1)] = (0x6 /*0b110*/ << 5) | (point >>> 6);
                resArr[(resPos += 1)] = (0x2 /*0b10*/ << 6) | (point & 0x3f) /*0b00111111*/;
            }
            else {
                resArr[(resPos += 1)] = (0xe /*0b1110*/ << 4) | (point >>> 12);
                resArr[(resPos += 1)] = (0x2 /*0b10*/ << 6) | ((point >>> 6) & 0x3f) /*0b00111111*/;
                resArr[(resPos += 1)] = (0x2 /*0b10*/ << 6) | (point & 0x3f) /*0b00111111*/;
            }
        }
        if (typeof Uint8Array !== 'undefined')
            return resArr.subarray(0, resPos + 1);
        // else // IE 6-9
        resArr.length = resPos + 1; // trim off extra weight
        return resArr;
    };
    global.TextEncoder.prototype.toString = function () {
        return '[object TextEncoder]';
    };
    try {
        // Object.defineProperty only works on DOM prototypes in IE8
        Object.defineProperty(global.TextEncoder.prototype, 'encoding', {
            get: function () {
                if (TextEncoder.prototype.isPrototypeOf(this))
                    return 'utf-8';
                else
                    throw TypeError('Illegal invocation');
            },
        });
    }
    catch (e) {
        /*IE6-8 fallback*/ global.TextEncoder.prototype.encoding = 'utf-8';
    }
    if (typeof Symbol !== 'undefined')
        global.TextEncoder.prototype[Symbol.toStringTag] = 'TextEncoder';
}

const numberToZarith = (value) => {
    let val = value;
    let zarith = '';
    while (true) {
        if (val >= 128) {
            let mod = val % 128;
            val -= mod;
            val /= 128;
            mod += 128;
            zarith += mod.toString(16);
        }
        else {
            if (val < 16) {
                zarith += '0';
            }
            zarith += val.toString(16);
            break;
        }
    }
    return zarith;
};
const bufferToHex = (buffer) => buffer.reduce((state, val) => `${state}${val.toString(16).padStart(2, '0')}`, '');

var Prim;
(function (Prim) {
    Prim["K_parameter"] = "parameter";
    Prim["K_storage"] = "storage";
    Prim["K_code"] = "code";
    Prim["D_False"] = "False";
    Prim["D_Elt"] = "Elt";
    Prim["D_Left"] = "Left";
    Prim["D_None"] = "None";
    Prim["D_Pair"] = "Pair";
    Prim["D_Right"] = "Right";
    Prim["D_Some"] = "Some";
    Prim["D_True"] = "True";
    Prim["D_Unit"] = "Unit";
    Prim["I_PACK"] = "PACK";
    Prim["I_UNPACK"] = "UNPACK";
    Prim["I_BLAKE2B"] = "BLAKE2B";
    Prim["I_SHA256"] = "SHA256";
    Prim["I_SHA512"] = "SHA512";
    Prim["I_ABS"] = "ABS";
    Prim["I_ADD"] = "ADD";
    Prim["I_AMOUNT"] = "AMOUNT";
    Prim["I_AND"] = "AND";
    Prim["I_BALANCE"] = "BALANCE";
    Prim["I_CAR"] = "CAR";
    Prim["I_CDR"] = "CDR";
    Prim["I_CHECK_SIGNATURE"] = "CHECK_SIGNATURE";
    Prim["I_COMPARE"] = "COMPARE";
    Prim["I_CONCAT"] = "CONCAT";
    Prim["I_CONS"] = "CONS";
    Prim["I_CREATE_ACCOUNT"] = "CREATE_ACCOUNT";
    Prim["I_CREATE_CONTRACT"] = "CREATE_CONTRACT";
    Prim["I_IMPLICIT_ACCOUNT"] = "IMPLICIT_ACCOUNT";
    Prim["I_DIP"] = "DIP";
    Prim["I_DROP"] = "DROP";
    Prim["I_DUP"] = "DUP";
    Prim["I_EDIV"] = "EDIV";
    Prim["I_EMPTY_MAP"] = "EMPTY_MAP";
    Prim["I_EMPTY_SET"] = "EMPTY_SET";
    Prim["I_EQ"] = "EQ";
    Prim["I_EXEC"] = "EXEC";
    Prim["I_FAILWITH"] = "FAILWITH";
    Prim["I_GE"] = "GE";
    Prim["I_GET"] = "GET";
    Prim["I_GT"] = "GT";
    Prim["I_HASH_KEY"] = "HASH_KEY";
    Prim["I_IF"] = "IF";
    Prim["I_IF_CONS"] = "IF_CONS";
    Prim["I_IF_LEFT"] = "IF_LEFT";
    Prim["I_IF_NONE"] = "IF_NONE";
    Prim["I_INT"] = "INT";
    Prim["I_LAMBDA"] = "LAMBDA";
    Prim["I_LE"] = "LE";
    Prim["I_LEFT"] = "LEFT";
    Prim["I_LOOP"] = "LOOP";
    Prim["I_LSL"] = "LSL";
    Prim["I_LSR"] = "LSR";
    Prim["I_LT"] = "LT";
    Prim["I_MAP"] = "MAP";
    Prim["I_MEM"] = "MEM";
    Prim["I_MUL"] = "MUL";
    Prim["I_NEG"] = "NEG";
    Prim["I_NEQ"] = "NEQ";
    Prim["I_NIL"] = "NIL";
    Prim["I_NONE"] = "NONE";
    Prim["I_NOT"] = "NOT";
    Prim["I_NOW"] = "NOW";
    Prim["I_OR"] = "OR";
    Prim["I_PAIR"] = "PAIR";
    Prim["I_PUSH"] = "PUSH";
    Prim["I_RIGHT"] = "RIGHT";
    Prim["I_SIZE"] = "SIZE";
    Prim["I_SOME"] = "SOME";
    Prim["I_SOURCE"] = "SOURCE";
    Prim["I_SENDER"] = "SENDER";
    Prim["I_SELF"] = "SELF";
    Prim["I_STEPS_TO_QUOTA"] = "STEPS_TO_QUOTA";
    Prim["I_SUB"] = "SUB";
    Prim["I_SWAP"] = "SWAP";
    Prim["I_TRANSFER_TOKENS"] = "TRANSFER_TOKENS";
    Prim["I_SET_DELEGATE"] = "SET_DELEGATE";
    Prim["I_UNIT"] = "UNIT";
    Prim["I_UPDATE"] = "UPDATE";
    Prim["I_XOR"] = "XOR";
    Prim["I_ITER"] = "ITER";
    Prim["I_LOOP_LEFT"] = "LOOP_LEFT";
    Prim["I_ADDRESS"] = "ADDRESS";
    Prim["I_CONTRACT"] = "CONTRACT";
    Prim["I_ISNAT"] = "ISNAT";
    Prim["I_CAST"] = "CAST";
    Prim["I_RENAME"] = "RENAME";
    Prim["T_bool"] = "bool";
    Prim["T_contract"] = "contract";
    Prim["T_int"] = "int";
    Prim["T_key"] = "key";
    Prim["T_key_hash"] = "key_hash";
    Prim["T_lambda"] = "lambda";
    Prim["T_list"] = "list";
    Prim["T_map"] = "map";
    Prim["T_big_map"] = "big_map";
    Prim["T_nat"] = "nat";
    Prim["T_option"] = "option";
    Prim["T_or"] = "or";
    Prim["T_pair"] = "pair";
    Prim["T_set"] = "set";
    Prim["T_signature"] = "signature";
    Prim["T_string"] = "string";
    Prim["T_bytes"] = "bytes";
    Prim["T_mutez"] = "mutez";
    Prim["T_timestamp"] = "timestamp";
    Prim["T_unit"] = "unit";
    Prim["T_operation"] = "operation";
    Prim["T_address"] = "address";
    // Alpha_002 addition
    Prim["I_SLICE"] = "SLICE";
    // Alpha_005 addition
    Prim["I_DIG"] = "DIG";
    Prim["I_DUG"] = "DUG";
    Prim["I_EMPTY_BIG_MAP"] = "EMPTY_BIG_MAP";
    Prim["I_APPLY"] = "APPLY";
    Prim["T_chain_id"] = "chain_id";
    Prim["I_CHAIN_ID"] = "CHAIN_ID";
    // /!\ NEW INSTRUCTIONS MUST BE ADDED AT THE END OF THE STRING_ENUM, FOR BACKWARD COMPATIBILITY OF THE ENCODING.
})(Prim || (Prim = {}));
const codeOfPrim = (() => {
    return Object.keys(Prim).reduce((state, key, index) => (Object.assign(Object.assign({}, state), { [key]: index.toString(16).toUpperCase().padStart(2, '0') })), {});
})();
const primOfCode = (() => {
    return Object.keys(Prim).reduce((state, key, index) => (Object.assign(Object.assign({}, state), { [index.toString(16).toUpperCase().padStart(2, '0')]: key })), {});
})();
const primOfString = (() => {
    return Object.keys(Prim).reduce((state, key) => (Object.assign(Object.assign({}, state), { [Prim[key]]: key })), {});
})();
const codeArgsAnnot = {
    0: {
        // No args, no annot
        false: '03',
        // No args, with annots
        true: '04',
    },
    1: {
        // Single arg, no annot
        false: '05',
        // Single arg, with annot
        true: '06',
    },
    2: {
        // Two args, no annot
        false: '07',
        // Two args, with annots
        true: '08',
    },
};

// Load Polyfill
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
const encodeMichelineJSON = (micheline) => {
    let byteString = [];
    switch (true) {
        case micheline instanceof Array:
            {
                const bytes = micheline
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
            }
            else if (micheline.string) {
                const string_bytes = new TextEncoder().encode(micheline.string);
                byteString = [
                    nodeEncoding['string_encoding'],
                    string_bytes.length.toString(16).padStart(8, '0'),
                    [...string_bytes].map((x) => x.toString(16).padStart(2, '0')).join(''),
                ];
            }
            else if (micheline.prim) {
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
                }
                else {
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
            }
            else if (micheline.bytes) {
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

const calculateSize = (json) => {
    let bytes = '';
    try {
        if (typeof json === 'string') {
            bytes = encodeMichelineJSON(JSON.parse(json));
        }
        else {
            bytes = encodeMichelineJSON(json);
        }
    }
    catch (e) {
        console.error(e);
    }
    return bytes.length / 2;
};

exports.calculateSize = calculateSize;
