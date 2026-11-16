import { isRegisteredSymbol } from "#modules/guard/guards/isRegisteredSymbol";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isRegisteredSymbol` accepts the candidate,
 * otherwise `whenFalse`.
 */
export const whenRegisteredSymbol = /* @__PURE__ */ createWhen(
  isRegisteredSymbol,
);
