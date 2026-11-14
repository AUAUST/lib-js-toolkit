import { createTagPreset } from "@auaust/engrenage/docs";

/**
 * Declares `@shorthand`: the barrel shorthand name of a helper.
 */
export const shorthand = createTagPreset({
  name: "shorthand",
  body: "inline",
});
