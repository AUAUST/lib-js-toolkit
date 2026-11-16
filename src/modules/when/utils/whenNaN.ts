import { isNaN } from "#modules/number/guards/isNaN";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isNaN` accepts the candidate, otherwise `whenFalse`.
 */
export const whenNaN = /* @__PURE__ */ createWhen(isNaN);
