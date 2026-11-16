import { isPlainObject } from "#modules/object/guards/isPlainObject";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isPlainObject` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenPlainObject = /* @__PURE__ */ createWhen(isPlainObject);
