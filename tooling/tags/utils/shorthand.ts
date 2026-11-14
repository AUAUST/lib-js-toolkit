import { createTagPreset } from "@auaust/engrenage/docs";

// @debt tooling/barrels reads this tag through its own name literal; the barrels extension should own and contribute this declaration so one definition holds the name.
/**
 * Declares `@shorthand`: the barrel shorthand name of a helper.
 */
export const shorthand = createTagPreset({
  name: "shorthand",
  body: "inline",
});
