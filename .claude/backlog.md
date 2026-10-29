# Backlog

Deferred work. One entry per item: where, what is wrong, the intended fix.

## 1. Tooling

1. Prettier drift.
   - Where: 85 files, mostly under `tests/`.
   - Problem: existing files predate the engrenage Prettier standard and fail `prettier --check`.
   - Fix: format them in a dedicated change.
2. Internal import style undecided.
   - Where: `src/` imports `@auaust/toolkit/<function>` through `tsconfig.json` paths; `scripts/` and `eslint.config.ts` load without those aliases, so they use `Object.*` and are exempt from the restricted-properties rule.
   - Problem: the package name in source reads like a dependency on the published package and only resolves through tsconfig-aware tools (plain Node resolves it to `dist/` through package self-reference). `#…` subpath imports in `package.json` (as engrenage does) resolve natively in Node, TypeScript, bundlers and Vitest and cannot leak into consumers' imports, but must not survive in published code or declarations.
   - Fix: decide the style together with the layout (AUAUST/lib-js-toolkit#104). If `#…` is chosen, check that tsdown inlines or rewrites them in bundles and `.d.ts` files, migrate `src/`, `scripts/` and `eslint.config.ts`, and update the AGENTS.md import rule. Tests keep the package name so they run unchanged against `dist/`.
3. Remaining repository lint failures.
   - Where: `src/utils/compare.ts`, `src/modules/forwarder/propertyForwarder.ts` and tests outside `tests/utils/plain.test.ts`.
   - Problem: repository lint fails on existing equality, promise, assertion, callback and unused-variable rules; the focused `plain` lint check passes.
   - Fix: resolve the remaining violations in a dedicated lint cleanup without weakening the shared configuration.
4. Packaging validation blocked by package-manager retrieval.
   - Where: `pnpm build`, during the tsdown package-validation step.
   - Problem: the installed pnpm cannot fetch and verify the pinned `pnpm@10.26.0` from the registry in the restricted environment, so packing fails after bundles and declarations are generated.
   - Fix: rerun the complete build when the pinned package manager is available; source and built-output tests and type checking already pass.

## 2. Source

1. Duplicate root exports.
   - Where: `src/index.ts`
   - Problem: `EmptyValue`, `EmptyValueOf` and `FilledValue` are exported explicitly and again through `export * from "@auaust/toolkit/types"` (reported by `import-x/export`).
   - Fix: keep a single export path for each type.
2. Lint suppressions audit.
   - Where: `src/utils/compare.ts` (`auaust/no-loose-equal`), `src/utils/debounce.ts` and `src/modules/forwarder/methodForwarder.ts` (`@typescript-eslint/no-this-alias`)
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

## 3. Upstream

1. Shared precedence section is incomplete.
   - Where: `@auaust/engrenage` `data/agents/sections/precedence.md` (reference block in `AGENTS.md`).
   - Problem: it ranks only the user, project instructions, shared instructions and existing code. It omits task reference material (issues, backlog), scoped rules, maintainer-only issue content, tool configuration and how to report overridden sources, so toolkit carries a local "Precedence in this project" section.
   - Fix: decide per point whether it belongs upstream; move the shared part into engrenage, then drop or shrink the local section.
2. No GitHub metadata sync.
   - Where: `@auaust/engrenage` CLI (new `github` command).
   - Problem: labels are a hand-copied set reused across repositories, and GitHub issue types and severity/priority fields are not used. Issue types are configured at organization level, so syncing them needs organization permissions.
   - Fix: add an engrenage command that syncs labels, issue types and bug levels from a library-owned definition, with a check mode, then adopt it in every AUAUST repository.

## 4. Planning

1. Scaffolding belongs in codegen.
   - Where: `scripts/make/`, `data/templates/`, `pnpm make`.
   - Problem: the scaffolding generator is toolkit-local, while `@auaust/codegen` (AUAUST/lib-js-codegen#4) is meant to own file generation for every AUAUST project. Its templates also encode the current `src/utils/` layout.
   - Fix: open a codegen issue to move scaffolding there; toolkit then consumes it, with templates following the layout decided in AUAUST/lib-js-toolkit#104.
2. Issue workflow undefined.
   - Where: AUAUST/lib-js-toolkit#103 and its sub-issues, AUAUST/lib-js-codegen#4.
   - Problem: agents do not know how a decision is recorded (edit the issue's "Settled" section and close it, or comment), whether settling a decision also updates AGENTS.md or `.claude/rules/`, whether they propose or decide on decision issues, or whether one issue maps to one branch, pull request and changeset.
   - Fix: decide the workflow and write it where agents read it (AGENTS.md or the tracking issues).
3. Issue readiness not visible.
   - Where: sub-issues of AUAUST/lib-js-toolkit#103 and AUAUST/lib-js-codegen#4.
   - Problem: blocking relations exist only in prose (for example #116 blocks #114 and #110; #110 also waits on a published codegen; #113 precedes the converters), so an agent cannot tell which issues are ready.
   - Fix: record them as GitHub "blocked by" relations or labels, ideally from the label sync in 3.2.
4. AGENTS.md rules to update as merge decisions settle.
   - Where: `AGENTS.md` "Source organization and public API", "Imports and types", "Scaffolding, build and packaging"; `.claude/rules/code-style.md`.
   - Problem: the layout, import and scaffolding rules describe `src/utils/` and `src/modules/`, and some planned helpers conflict with current rules: the type-dispatch helper (AUAUST/lib-js-toolkit#113) needs native `typeof` outside `is<Type>` helpers, and lowercase short assertions (#115) would break camelCase.
   - Fix: update each rule when its decision issue closes.
