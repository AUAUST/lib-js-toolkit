import { isBlankString } from "#modules/string/guards/isBlankString";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isBlankString` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenBlankString = /* @__PURE__ */ createWhen(isBlankString);
