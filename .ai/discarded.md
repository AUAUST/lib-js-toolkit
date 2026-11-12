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
- one GitHub label per toolkit module: issue search by area — stale when helpers relocate (#176), most modules under ~5 issues; value-kind labels instead
- `Tooling` label in toolkit: tooling issues findable — implied by every narrower tooling label; retired in the label report
- `Formatting` and `Release` labels in toolkit: engrenage parity — one toolkit issue each (#193, #112)
- cognitive-complexity limit 8 or lower: toolkit complexity limit — forces splitting flat switches and single loops (`compare`, remapping loop, `pipeAsync` condition)
- `TextEncoder` in `md5`: UTF-8 encoding — maps lone surrogates to U+FFFD, changing hashes
