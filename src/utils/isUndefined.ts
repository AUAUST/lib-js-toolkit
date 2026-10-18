export function isUndefined(input: unknown): input is undefined {
  return typeof input === "undefined";
}
