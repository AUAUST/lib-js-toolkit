import { isEmptyArray } from "#modules/array/guards/isEmptyArray";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isEmptyArray` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenEmptyArray = /* @__PURE__ */ createWhen(isEmptyArray);
