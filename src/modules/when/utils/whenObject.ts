import { isObject } from "#modules/object/guards/isObject";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isObject` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenObject = /* @__PURE__ */ createWhen(isObject);
