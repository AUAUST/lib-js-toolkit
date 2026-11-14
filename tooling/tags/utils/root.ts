import { createTagPreset } from "@auaust/engrenage/docs";

// @debt tooling/barrels reads this tag through its own name literal; the barrels extension should own and contribute this declaration so one definition holds the name.
/**
 * Declares `@root`, marking a helper the root entry re-exports: no body.
 */
export const root = createTagPreset({
  name: "root",
  body: "none",
});
