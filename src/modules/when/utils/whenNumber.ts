import { isNumber } from "#modules/number/guards/isNumber";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isNumber` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenNumber = /* @__PURE__ */ createWhen(isNumber);
