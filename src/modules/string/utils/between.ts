import type { Maybe } from "#types/Maybe";

/**
 * Returns the part of the string between the first occurrence of the start needle
 * and the last occurrence of the end needle after it, or `undefined` when either
 * needle is missing. A nullish string returns `undefined`.
 */
export function between(
  string: string,
  start: string,
  end: string,
): string | undefined;
export function between(
  string: null | undefined,
  start: string,
  end: string,
): undefined;
export function between(
  string: Maybe<string>,
  start: string,
  end: string,
): string | undefined;
export function between(
  string: Maybe<string>,
  start: string,
  end: string,
): string | undefined {
  if (string == null) {
    return;
  }

  const startIndex = string.indexOf(start);

  if (startIndex === -1) {
    return;
  }

  const contentIndex = startIndex + start.length;
  const endIndex = string.lastIndexOf(end);

  return endIndex < contentIndex
    ? undefined
    : string.slice(contentIndex, endIndex);
}
