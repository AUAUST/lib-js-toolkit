# Engrenage

## 1. No GitHub metadata sync

- Labels are a hand-copied set reused across repositories, and GitHub issue types and severity/priority fields are not used. Issue types are configured at organization level, so syncing them needs organization permissions.
- Outcome: an engrenage `github` command that syncs labels, issue types and bug levels from a library-owned definition, with a check mode, adopted in every AUAUST repository.
- Done when toolkit's labels and issue types come from the sync.

## 2. Dist tests reject tooling's source imports

- The matrix lets `*.test.ts` import `tooling` and `tooling` import internal aliases, but the dist source guard rejects transitive resolutions into `src/`, so `tests/tooling/tags/tags.test.src.ts` stays source-only.
- Outcome: tooling tests run in source mode only, or lint forbids the chain.
- Done when such a `*.test.ts` passes both runs or fails lint.

## 3. jscpd reports generated barrels as clones

- `engrenage jscpd:new` lists `src/modules/function/entry.ts` and `src/modules/guard/entry.ts` as clones: both are `engrenage sync barrels` output, whose sorted re-export lines repeat by construction.
- Outcome: the jscpd preset ignores files carrying a generator header, or the barrel paths.
- Done when `jscpd:new` stops reporting generated barrels.
