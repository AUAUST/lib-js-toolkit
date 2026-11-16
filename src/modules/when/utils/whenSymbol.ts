import { isSymbol } from "#modules/guard/guards/isSymbol";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isSymbol` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenSymbol = /* @__PURE__ */ createWhen(isSymbol);
