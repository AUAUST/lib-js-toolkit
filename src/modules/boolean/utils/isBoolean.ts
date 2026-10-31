export function isBoolean(candidate: unknown): candidate is boolean {
  return typeof candidate === "boolean";
}
