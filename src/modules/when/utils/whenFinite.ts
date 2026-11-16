import { isFinite } from "#modules/number/guards/isFinite";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isFinite` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenFinite = /* @__PURE__ */ createWhen(isFinite);
