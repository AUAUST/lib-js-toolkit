# Backlog

Deferred work. One entry per item: where, what is wrong, the intended fix.

## 1. Tooling

1. Legacy lint suppressions.
   - Where: `eslint-suppressions.json`
   - Problem: code written before adopting `@auaust/engrenage/eslint` has 114 suppressed violations, 72 of them auto-fixable (statement padding, object newlines, `prefer-const`, type import side effects).
   - Fix: run `pnpm lint --fix`, fix the rest by hand, then `pnpm exec eslint . --prune-suppressions`.
2. Prettier drift.
   - Where: 85 files, mostly under `tests/`.
   - Problem: existing files predate the engrenage Prettier standard and fail `prettier --check`.
   - Fix: format them in a dedicated change.
3. Tooling cannot reuse toolkit helpers.
   - Where: `codegen/`, `scripts/`, `eslint.config.ts`
   - Problem: tooling loads without the `@auaust/toolkit/*` path aliases, so it uses `Object.*` and is exempt from the restricted-properties rule.
   - Fix: declare `#…` subpath imports in `package.json`, as engrenage does, and import helpers through them.

## 2. Source

1. Duplicate root exports.
   - Where: `src/index.ts`
   - Problem: `EmptyValue`, `EmptyValueOf` and `FilledValue` are exported explicitly and again through `export * from "@auaust/toolkit/types"` (reported by `import-x/export`).
   - Fix: keep a single export path for each type.
