import { isNumeric } from "#modules/guard/guards/isNumeric";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isNumeric` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenNumeric = /* @__PURE__ */ createWhen(isNumeric);
