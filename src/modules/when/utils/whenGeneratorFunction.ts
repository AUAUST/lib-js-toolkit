import { isGeneratorFunction } from "#modules/function/guards/isGeneratorFunction";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isGeneratorFunction` accepts the candidate,
 * otherwise `whenFalse`.
 */
export const whenGeneratorFunction = /* @__PURE__ */ createWhen(
  isGeneratorFunction,
);
