export enum Prim {
  K_parameter = 'parameter',
  K_storage = 'storage',
  K_code = 'code',
  D_False = 'False',
  D_Elt = 'Elt',
  D_Left = 'Left',
  D_None = 'None',
  D_Pair = 'Pair',
  D_Right = 'Right',
  D_Some = 'Some',
  D_True = 'True',
  D_Unit = 'Unit',
  I_PACK = 'PACK',
  I_UNPACK = 'UNPACK',
  I_BLAKE2B = 'BLAKE2B',
  I_SHA256 = 'SHA256',
  I_SHA512 = 'SHA512',
  I_ABS = 'ABS',
  I_ADD = 'ADD',
  I_AMOUNT = 'AMOUNT',
  I_AND = 'AND',
  I_BALANCE = 'BALANCE',
  I_CAR = 'CAR',
  I_CDR = 'CDR',
  I_CHECK_SIGNATURE = 'CHECK_SIGNATURE',
  I_COMPARE = 'COMPARE',
  I_CONCAT = 'CONCAT',
  I_CONS = 'CONS',
  I_CREATE_ACCOUNT = 'CREATE_ACCOUNT',
  I_CREATE_CONTRACT = 'CREATE_CONTRACT',
  I_IMPLICIT_ACCOUNT = 'IMPLICIT_ACCOUNT',
  I_DIP = 'DIP',
  I_DROP = 'DROP',
  I_DUP = 'DUP',
  I_EDIV = 'EDIV',
  I_EMPTY_MAP = 'EMPTY_MAP',
  I_EMPTY_SET = 'EMPTY_SET',
  I_EQ = 'EQ',
  I_EXEC = 'EXEC',
  I_FAILWITH = 'FAILWITH',
  I_GE = 'GE',
  I_GET = 'GET',
  I_GT = 'GT',
  I_HASH_KEY = 'HASH_KEY',
  I_IF = 'IF',
  I_IF_CONS = 'IF_CONS',
  I_IF_LEFT = 'IF_LEFT',
  I_IF_NONE = 'IF_NONE',
  I_INT = 'INT',
  I_LAMBDA = 'LAMBDA',
  I_LE = 'LE',
  I_LEFT = 'LEFT',
  I_LOOP = 'LOOP',
  I_LSL = 'LSL',
  I_LSR = 'LSR',
  I_LT = 'LT',
  I_MAP = 'MAP',
  I_MEM = 'MEM',
  I_MUL = 'MUL',
  I_NEG = 'NEG',
  I_NEQ = 'NEQ',
  I_NIL = 'NIL',
  I_NONE = 'NONE',
  I_NOT = 'NOT',
  I_NOW = 'NOW',
  I_OR = 'OR',
  I_PAIR = 'PAIR',
  I_PUSH = 'PUSH',
  I_RIGHT = 'RIGHT',
  I_SIZE = 'SIZE',
  I_SOME = 'SOME',
  I_SOURCE = 'SOURCE',
  I_SENDER = 'SENDER',
  I_SELF = 'SELF',
  I_STEPS_TO_QUOTA = 'STEPS_TO_QUOTA',
  I_SUB = 'SUB',
  I_SWAP = 'SWAP',
  I_TRANSFER_TOKENS = 'TRANSFER_TOKENS',
  I_SET_DELEGATE = 'SET_DELEGATE',
  I_UNIT = 'UNIT',
  I_UPDATE = 'UPDATE',
  I_XOR = 'XOR',
  I_ITER = 'ITER',
  I_LOOP_LEFT = 'LOOP_LEFT',
  I_ADDRESS = 'ADDRESS',
  I_CONTRACT = 'CONTRACT',
  I_ISNAT = 'ISNAT',
  I_CAST = 'CAST',
  I_RENAME = 'RENAME',
  T_bool = 'bool',
  T_contract = 'contract',
  T_int = 'int',
  T_key = 'key',
  T_key_hash = 'key_hash',
  T_lambda = 'lambda',
  T_list = 'list',
  T_map = 'map',
  T_big_map = 'big_map',
  T_nat = 'nat',
  T_option = 'option',
  T_or = 'or',
  T_pair = 'pair',
  T_set = 'set',
  T_signature = 'signature',
  T_string = 'string',
  T_bytes = 'bytes',
  T_mutez = 'mutez',
  T_timestamp = 'timestamp',
  T_unit = 'unit',
  T_operation = 'operation',
  T_address = 'address',

  // Alpha_002 addition
  I_SLICE = 'SLICE',
  // Alpha_005 addition
  I_DIG = 'DIG',
  I_DUG = 'DUG',
  I_EMPTY_BIG_MAP = 'EMPTY_BIG_MAP',
  I_APPLY = 'APPLY',
  T_chain_id = 'chain_id',
  I_CHAIN_ID = 'CHAIN_ID',
  // /!\ NEW INSTRUCTIONS MUST BE ADDED AT THE END OF THE STRING_ENUM, FOR BACKWARD COMPATIBILITY OF THE ENCODING.
}

export const codeOfPrim: CodeOfPrim = (() => {
  return Object.keys(Prim).reduce(
    (state, key: PrimKey, index) => ({
      ...state,
      [key]: index.toString(16).toUpperCase().padStart(2, '0'),
    }),
    {} as CodeOfPrim
  );
})();

export const primOfCode: PrimOfCode = (() => {
  return Object.keys(Prim).reduce(
    (state, key: PrimKey, index) => ({
      ...state,
      [index.toString(16).toUpperCase().padStart(2, '0')]: key,
    }),
    {} as PrimOfCode
  );
})();

export const primOfString: PrimOfString = (() => {
  return Object.keys(Prim).reduce(
    (state, key: PrimKey) => ({
      ...state,
      [Prim[key]]: key,
    }),
    {} as PrimOfString
  );
})();

export const codeArgsAnnot: { [args: number]: { [bool: string]: string } } = {
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
