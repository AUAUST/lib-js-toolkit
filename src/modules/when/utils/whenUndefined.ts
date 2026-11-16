import { isUndefined } from "#modules/guard/guards/isUndefined";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isUndefined` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenUndefined = /* @__PURE__ */ createWhen(isUndefined);
