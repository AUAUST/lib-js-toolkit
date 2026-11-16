import { isBoolean } from "#modules/boolean/guards/isBoolean";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isBoolean` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenBoolean = /* @__PURE__ */ createWhen(isBoolean);
