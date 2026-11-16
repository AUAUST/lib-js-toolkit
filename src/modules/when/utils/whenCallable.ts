import { isCallable } from "#modules/function/guards/isCallable";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isCallable` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenCallable = /* @__PURE__ */ createWhen(isCallable);
