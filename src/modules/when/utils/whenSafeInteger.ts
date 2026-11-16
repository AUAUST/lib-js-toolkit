import { isSafeInteger } from "#modules/number/guards/isSafeInteger";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isSafeInteger` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenSafeInteger = /* @__PURE__ */ createWhen(isSafeInteger);
