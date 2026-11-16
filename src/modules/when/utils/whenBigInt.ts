import { isBigInt } from "#modules/guard/guards/isBigInt";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isBigInt` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenBigInt = /* @__PURE__ */ createWhen(isBigInt);
