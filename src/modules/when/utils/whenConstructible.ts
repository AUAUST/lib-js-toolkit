import { isConstructible } from "#modules/function/guards/isConstructible";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isConstructible` accepts the candidate,
 * otherwise `whenFalse`.
 */
export const whenConstructible = /* @__PURE__ */ createWhen(isConstructible);
