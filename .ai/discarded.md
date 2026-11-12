# Discarded solutions

- layers in src: order `src/utils` above `modules` (#187 Q1a) — toolkit has no dependency direction; `getOrSet.ts` imports back
- helper types in `types/`: satisfy `named-match` — moves types away from their helper; fixed upstream instead
- barrelsby: generated barrels — single maintainer, no release in two years, no namespace or metadata re-exports
- @microsoft/api-extractor: API docs — rollup assumes one entry point; TypeDoc fits module entries
- toolkit lint extension in `src`: ship conventions as a subpath — puts ESLint and engrenage into the runtime package
- `defineMacro` runtime export: helper metadata (#116) — a real export to strip from the bundle and exempt from barrels; JSDoc tags carry it at no runtime cost
- local tsdown tag-trimming plugin: internal JSDoc tags out of `.d.mts` — engrenage owns the builder; requested upstream
- `{@link}` relation references: helper-to-native relations (#183) — TypeScript resolves only names in scope and reports no broken link
- `tooling/barrels` local extension: toolkit barrels — engrenage renders every barrel (AUAUST/lib-js-engrenage#441); at most `barrels.exports` contributions stay local
- `symbols` role with `subpath: true`: `./protocol/symbols` — generated entry would stop re-exporting the symbols; no such subpath exists today
- `types` role with `index` and `subpath` in every module: `./types` from the global role — also exposes `./protocol/types` and drops its types from the `protocol` entry; `index`/`subpath` `"root"` instead (AUAUST/lib-js-engrenage#483, AUAUST/lib-js-engrenage#493)
