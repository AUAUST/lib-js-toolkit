import { join } from "#modules/array/utils/join";

/**
 * Joins rendered items between the delimiters, appending `...skipped N` when
 * items were left out; braces pad a non-empty list with spaces.
 */
export function inspectList(
  items: readonly string[],
  skipped: number,
  braces: boolean,
): string {
  const list = join(
    skipped > 0 ? [...items, `...skipped ${skipped}`] : [...items],
    ", ",
  );

  if (!braces) {
    return `[${list}]`;
  }

  return list ? `{ ${list} }` : "{}";
}
