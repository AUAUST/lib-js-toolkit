import { isArray } from "#modules/array/guards/isArray";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isArray` accepts the candidate, otherwise `whenFalse`.
 */
export const whenArray = /* @__PURE__ */ createWhen(isArray);
