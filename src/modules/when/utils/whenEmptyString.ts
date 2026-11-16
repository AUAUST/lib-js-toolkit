import { isEmptyString } from "#modules/string/guards/isEmptyString";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isEmptyString` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenEmptyString = /* @__PURE__ */ createWhen(isEmptyString);
