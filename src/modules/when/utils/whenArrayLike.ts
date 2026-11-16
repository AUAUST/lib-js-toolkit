import { isArrayLike } from "#modules/array/guards/isArrayLike";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isArrayLike` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenArrayLike = /* @__PURE__ */ createWhen(isArrayLike);
