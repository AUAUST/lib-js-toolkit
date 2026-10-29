# Codegen

## 1. Scaffolding belongs in codegen

- `scripts/make/`, `data/templates/` and `pnpm make` form a toolkit-local generator, while `@auaust/codegen` (AUAUST/lib-js-codegen#4) is meant to own file generation for every AUAUST project. The templates also encode the current `src/utils/` layout.
- Outcome: a codegen issue to move scaffolding there; toolkit then consumes it, with templates following the layout decided in AUAUST/lib-js-toolkit#104.
- Done when toolkit scaffolds through codegen and the local generator is removed.
