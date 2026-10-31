const propertyKeyTypes = new Set(["string", "number", "symbol"]);

export function isPropertyKey(candidate: unknown): candidate is PropertyKey {
  return propertyKeyTypes.has(typeof candidate);
}
