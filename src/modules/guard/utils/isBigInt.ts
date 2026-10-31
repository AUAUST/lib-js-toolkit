export function isBigInt(candidate: unknown): candidate is bigint {
  return typeof candidate === "bigint";
}
