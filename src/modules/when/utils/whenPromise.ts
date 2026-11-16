import { isPromise } from "#modules/async/guards/isPromise";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isPromise` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenPromise = /* @__PURE__ */ createWhen(isPromise);
