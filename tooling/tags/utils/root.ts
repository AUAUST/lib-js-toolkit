import { createTagPreset } from "@auaust/engrenage/docs";

/**
 * Declares `@root`, marking a helper the root entry re-exports: no body.
 */
export const root = createTagPreset({
  name: "root",
  body: "none",
});
