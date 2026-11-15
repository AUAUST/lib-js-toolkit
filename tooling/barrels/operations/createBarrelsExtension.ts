import { defineExtension } from "@auaust/engrenage/extensions";

/**
 * Creates the extension contributing the barrel export names the structure
 * cannot state.
 */
export function createBarrelsExtension() {
  return defineExtension({
    name: "toolkit/barrels",
    contributes: {
      "barrels.exports": [
        {
          name: "shorthands",
          load() {
            return import("#tooling/barrels/operations/exportShorthands");
          },
        },
        {
          name: "parsers",
          load() {
            return import("#tooling/barrels/operations/exportParsers");
          },
        },
        {
          name: "guard variants",
          load() {
            return import("#tooling/barrels/operations/exportGuardVariants");
          },
        },
        {
          name: "root names",
          load() {
            return import("#tooling/barrels/operations/exportRootNames");
          },
        },
      ],
    },
  });
}
