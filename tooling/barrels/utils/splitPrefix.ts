/**
 * Splits a `<prefix><Type>` name into the first of `prefixes` it starts with and its capitalized `<Type>` rest.
 */
export function splitPrefix<Prefix extends string>(
  name: string,
  prefixes: readonly Prefix[],
): { prefix: Prefix; type: string } | undefined {
  for (const prefix of prefixes) {
    const type = name.slice(prefix.length);

    if (name.startsWith(prefix) && /^[A-Z]/u.test(type)) {
      return { prefix, type };
    }
  }
}
