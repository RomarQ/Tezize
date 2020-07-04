/**
 * Tezize Module Interface
 */
declare interface TezizeInterface {
  calculateSize: (json: JSON) => Number;
}

// The following types definitions were adapted from https://gitlab.com/tezos/.../lib_micheline/micheline.ml

type Bytes = string;
type Int = string;
type Annot = string;

declare type MichelineToken = String | Bytes | Int | Annot;

/**
 * Generic prim (any number of args with or without annot)
 */
declare interface GenericPrimitive {
  prim: string;
  args?: Micheline[];
  annots?: string[];
}

declare interface IntPrim {
  int: Int;
}

declare interface StringPrim {
  string: string;
}

declare interface BytesPrim {
  bytes: Bytes;
}

declare type Micheline = GenericPrimitive & BytesPrim & IntPrim & StringPrim & Micheline[];
