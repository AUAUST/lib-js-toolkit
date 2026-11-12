export function isSymbol(candidate: unknown): candidate is symbol {
  return typeof candidate === "symbol";
}
