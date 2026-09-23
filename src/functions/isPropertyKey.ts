export function isPropertyKey(input: unknown): input is PropertyKey {
  return (
    typeof input === "string" ||
    typeof input === "number" ||
    typeof input === "symbol"
  );
}
