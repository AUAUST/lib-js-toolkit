import { getTag } from "#modules/object/utils/getTag";

/**
 * Whether the candidate's `Object.prototype.toString` tag is `[object <name>]`. A
 * `Symbol.toStringTag` property overrides the name; the tag matches across realms.
 */
export function hasTag(candidate: unknown, name: string): boolean {
  return getTag(candidate) === `[object ${name}]`;
}
