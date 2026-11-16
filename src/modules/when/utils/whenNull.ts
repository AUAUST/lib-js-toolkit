import { isNull } from "#modules/guard/guards/isNull";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isNull` accepts the candidate, otherwise `whenFalse`.
 */
export const whenNull = /* @__PURE__ */ createWhen(isNull);
