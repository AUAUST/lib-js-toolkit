import { isContainer } from "#modules/guard/guards/isContainer";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isContainer` accepts the candidate, otherwise
 * `whenFalse`.
 */
export const whenContainer = /* @__PURE__ */ createWhen(isContainer);
