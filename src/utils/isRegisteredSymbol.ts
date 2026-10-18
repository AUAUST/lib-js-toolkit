/**
 * Returns `true` if the input is a registered symbol, registered with `Symbol.for`.
 */
export function isRegisteredSymbol(input: unknown): input is symbol {
  return typeof input === "symbol" && Symbol.keyFor(input) !== undefined;
}
