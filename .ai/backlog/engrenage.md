# Engrenage

## 1. Dist tests reject tooling's source imports

- The matrix lets `*.test.ts` import `tooling` and `tooling` import internal aliases, but the dist source guard rejects transitive resolutions into `src/`, so `tests/tooling/tags/tags.test.src.ts` stays source-only. Still so in engrenage 0.14.1; no upstream issue.
- Outcome (decision): tooling tests run in source mode only, or lint forbids the chain; then file it in AUAUST/lib-js-engrenage.
- Done when such a `*.test.ts` passes both runs or fails lint.
