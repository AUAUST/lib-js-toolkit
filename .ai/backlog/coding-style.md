# Coding style

## 1. Prettier drift in `src/utils/cached.ts`

- `src/utils/cached.ts` fails `prettier --check`: the `CachedOptions` generic parameter list exceeds the print width. It is the only remaining source file out of format after the lint passes.
- Outcome: format it in a dedicated change.
- Done when `prettier --check src` passes.

## 2. Remaining lint warnings

- `pnpm lint` reports no errors but 33 warnings, mainly `@typescript-eslint/require-await` and `auaust/no-unused-vars`, in `src/modules/forwarder/propertyForwarder.ts` and tests (`tests/modules/composer/compose.test.ts`, `tests/protocols/index.test.ts`, and `after`, `cachedAsync`, `isPlainObject`, `mapped`, `measureAsync`, `pipeAsync` and `transform` under `tests/utils/`).
- Outcome: resolve them without weakening the shared configuration or adding suppressions.
- Done when `pnpm lint` reports no warnings.

## 3. Lint suppressions audit

- Disables remain in `src/utils/compare.ts` (`auaust/no-loose-equal`, file-wide), `src/utils/debounce.ts` and `src/modules/forwarder/methodForwarder.ts` (`@typescript-eslint/no-this-alias`). None is verified as a genuine exception.
- Outcome: keep a disable only where no clean alternative exists, scoped as narrowly as possible; refactor the others.
- Done when each remaining disable has a verified invariant.

## 4. Switch internal imports to `#` subpath imports

- Decided in AUAUST/lib-js-toolkit#104: internal imports use `package.json` `#…` subpath imports instead of self-referencing `@auaust/toolkit/<function>`.
- Today `src/` resolves the package name through `tsconfig.json` paths; `scripts/` and `eslint.config.ts` load without those aliases, so they use `Object.*` and are exempt from the restricted-properties rule. `#…` imports resolve natively in Node, TypeScript, bundlers and Vitest, but must not survive in published code or declarations.
- Outcome: check that tsdown inlines or rewrites them in bundles and `.d.ts` files, then migrate `src/`, `scripts/` and `eslint.config.ts`. Tests keep the package name so they run unchanged against `dist/`. This is a shared change made before migration agents start (`merge.8`); the AGENTS.md import rule follows in the final rules pass (`agent-instructions.1`).
- Done when no source file imports the package's own name.
