import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isPropertyKey` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenPropertyKey = /* @__PURE__ */ createWhen(isPropertyKey);
