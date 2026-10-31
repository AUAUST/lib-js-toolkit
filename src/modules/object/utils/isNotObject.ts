import { isObject } from "#modules/object/utils/isObject";

/**
 * Checks that the candidate is not an object; functions are not objects here, and `object` removes function types too.
 * Use a positive guard such as `isString` to narrow `unknown`.
 */
export function isNotObject<Candidate>(
  candidate: Candidate,
): candidate is Exclude<Candidate, object> {
  return !isObject(candidate);
}
