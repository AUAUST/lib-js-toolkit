import { isInteger } from "#modules/number/guards/isInteger";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isInteger` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenInteger = /* @__PURE__ */ createWhen(isInteger);
