import { isFunction } from "#modules/function/guards/isFunction";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isFunction` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenFunction = /* @__PURE__ */ createWhen(isFunction);
