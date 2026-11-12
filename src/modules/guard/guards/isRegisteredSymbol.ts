/**
 * Returns `true` if the candidate is a registered symbol, registered with `Symbol.for`.
 */
export function isRegisteredSymbol(candidate: unknown): candidate is symbol {
  return (
    typeof candidate === "symbol" && Symbol.keyFor(candidate) !== undefined
  );
}
