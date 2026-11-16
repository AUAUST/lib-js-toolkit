import { isAsyncFunction } from "#modules/function/guards/isAsyncFunction";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isAsyncFunction` accepts the candidate,
 * otherwise `whenFalse`.
 */
export const whenAsyncFunction = /* @__PURE__ */ createWhen(isAsyncFunction);
