import { isAsyncGeneratorFunction } from "#modules/function/guards/isAsyncGeneratorFunction";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isAsyncGeneratorFunction` accepts the candidate,
 * otherwise `whenFalse`.
 */
export const whenAsyncGeneratorFunction = /* @__PURE__ */ createWhen(
  isAsyncGeneratorFunction,
);
