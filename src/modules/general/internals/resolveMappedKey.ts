/**
 * Normalises a key mapper's result: `false` or nullish drops the key
 * (`undefined`), `true` keeps the source key.
 */
export function resolveMappedKey(
  mappedKey: PropertyKey | boolean | null | undefined,
  sourceKey: PropertyKey,
): PropertyKey | undefined {
  if (mappedKey === false || mappedKey == null) {
    return;
  }

  return mappedKey === true ? sourceKey : mappedKey;
}
