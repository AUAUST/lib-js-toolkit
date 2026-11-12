export function isString(candidate: unknown): candidate is string {
  return typeof candidate === "string";
}
