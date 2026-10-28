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
2. Lint suppressions audit.
   - Where: `src/utils/compare.ts` (`eqeqeq`), `src/utils/noop.ts` (`unused-imports/no-unused-vars`), `src/utils/debounce.ts` and `src/modules/forwarder/methodForwarder.ts` (`@typescript-eslint/no-this-alias`)
   - Problem: each disable is unverified as a genuine exception.
   - Fix: review each site; keep the disable only where no clean alternative exists, otherwise refactor.
3. No safe access to native object methods.
   - Where: `src/utils/`
   - Problem: calling `x.valueOf()`, `x.toString()` and similar fails on null-prototype objects, and toolkit offers no helpers for these native operations.
   - Fix: add helpers that invoke the `Object.prototype` (or matching built-in) methods so null-prototype objects work safely.
4. Library README lacks domain overviews.
   - Where: `README.md`
   - Problem: the generalities of each domain (utils, types, errors, protocols, modules) are only discoverable by reading the source.
   - Fix: document each domain's purpose and conventions in the root README; see AUAUST/lib-js-engrenage#22 for generating it.
