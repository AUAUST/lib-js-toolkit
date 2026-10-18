export function isBigInt(input: unknown): input is bigint {
  return typeof input === "bigint";
}
