import { isScalar } from "#modules/guard/guards/isScalar";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isScalar` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenScalar = /* @__PURE__ */ createWhen(isScalar);
