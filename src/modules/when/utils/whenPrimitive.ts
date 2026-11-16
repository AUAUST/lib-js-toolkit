import { isPrimitive } from "#modules/guard/guards/isPrimitive";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isPrimitive` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenPrimitive = /* @__PURE__ */ createWhen(isPrimitive);
