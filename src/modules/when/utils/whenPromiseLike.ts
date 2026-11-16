import { isPromiseLike } from "#modules/async/guards/isPromiseLike";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isPromiseLike` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenPromiseLike = /* @__PURE__ */ createWhen(isPromiseLike);
