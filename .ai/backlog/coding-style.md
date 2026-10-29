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

- Settled in AUAUST/lib-js-toolkit#104: `src/` imports through `package.json` `imports` (`#utils/*`, `#types/*`, `#errors/*`, `#modules/*`, each mapping to `./src/<role>/*.ts`), from the defining file, never through the package's own name or relative paths. Tests keep importing `@auaust/toolkit…` entries only. The switch is part of the layout relocation task (`merge.4`), in this order: add `imports`, rewrite the `src/` imports, remove the wildcard `tsconfig.json` paths.
- Remaining after the relocation: `scripts/` uses `Object.*` because it loaded without the aliases; whether it moves to `#` imports and toolkit helpers is part of the scaffolding rework (`merge.8`). The AGENTS.md import rule follows in the final rules pass (`agent-instructions.1`).
- Done when no file in `src/` imports the package's own name and the build output contains no `#` import.

