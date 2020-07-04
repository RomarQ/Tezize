import '../polyfill/TextEncoder';
/**
 * Parses the contract JSON representation to its byte representation.
 * @param {Micheline} micheline contract JSON representation.
 * @returns {string} byte representation.
 */
export declare const encodeMichelineJSON: (micheline: Micheline) => string;
