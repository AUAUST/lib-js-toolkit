import { defineExtension } from "@auaust/engrenage/extensions";

/**
 * Creates the extension contributing the barrel export names the structure cannot
 * state.
 */
export function createBarrelsExtension() {
  return defineExtension({
    name: "toolkit/barrels",
    contributes: {
      "barrels.exports": [
        {
          name: "shorthands",
          async load() {
            const {
              exportShorthands,
            } = await import("#tooling/barrels/operations/exportShorthands");

            return exportShorthands;
          },
        },
        {
          name: "parsers",
          async load() {
            const {
              exportParsers,
            } = await import("#tooling/barrels/operations/exportParsers");

            return exportParsers;
          },
        },
        {
          name: "guard variants",
          async load() {
            const {
              exportGuardVariants,
            } = await import("#tooling/barrels/operations/exportGuardVariants");

            return exportGuardVariants;
          },
        },
        {
          name: "root names",
          async load() {
            const {
              exportRootNames,
            } = await import("#tooling/barrels/operations/exportRootNames");

            return exportRootNames;
          },
        },
      ],
    },
  });
}
