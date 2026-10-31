export function isNumber(candidate: unknown): candidate is number {
  return typeof candidate === "number";
}
