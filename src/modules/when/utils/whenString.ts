import { isString } from "#modules/string/guards/isString";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isString` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenString = /* @__PURE__ */ createWhen(isString);
