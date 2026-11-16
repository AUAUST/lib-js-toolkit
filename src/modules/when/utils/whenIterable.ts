import { isIterable } from "#modules/iterable/guards/isIterable";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isIterable` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenIterable = /* @__PURE__ */ createWhen(isIterable);
