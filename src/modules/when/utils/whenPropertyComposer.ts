import { isPropertyComposer } from "#modules/composer/guards/isPropertyComposer";
import { createWhen } from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isPropertyComposer` accepts the candidate,
 * otherwise `whenFalse`.
 */
export const whenPropertyComposer = /* @__PURE__ */ createWhen(
  isPropertyComposer,
);
