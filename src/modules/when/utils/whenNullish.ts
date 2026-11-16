import { isNullish } from "#modules/guard/guards/isNullish";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isNullish` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenNullish = /* @__PURE__ */ createWhen(isNullish);
