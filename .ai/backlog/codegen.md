# Codegen

## 1. Scaffolding belongs in codegen

- `scripts/make/`, `data/templates/` and `pnpm make` form a toolkit-local generator, while `@auaust/codegen` (AUAUST/lib-js-codegen#4) is meant to own file generation for every AUAUST project. The templates also encode the current `src/utils/` layout.
- Outcome: a codegen issue to move scaffolding there; toolkit then consumes it, with templates following the layout decided in AUAUST/lib-js-toolkit#104.
- Done when toolkit scaffolds through codegen and the local generator is removed.

## 2. Deriving `@throws` from code

- Settled in AUAUST/lib-js-toolkit#103: `@throws` is not written by hand, because it would drift from the code.
- Proposal: derive it from the `throw` statements of each helper, with an optional meta comment giving the condition, for example ``throw new TypeError("Invalid input"); /** @cause when the `value` is not a string */`` producing ``@throws {TypeError} - when the `value` is not a string``. Open: errors thrown by called helpers, rethrows, errors built by shared helpers (AUAUST/lib-js-toolkit#119).
- Outcome: a check of whether this is automatable, and if so a generator in codegen.
- Done when `@throws` is generated, or the idea is dropped as not automatable.
