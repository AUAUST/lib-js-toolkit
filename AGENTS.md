# AGENTS.md

Apply throughout the repository. Follow these rules in changed code; preserve unrelated work.

<!-- @reference @auaust/engrenage/agents/sections/instruction-maintenance.md -->

## Instruction maintenance

- Change agent instructions or their sources only with explicit user consent to that change.
- Translate requests into minimal, specific, actionable rules. Preserve intent and resolve overlap or contradictions instead of appending the user's wording verbatim.
- Before writing instructions, ask focused questions whenever intent, scope or conflicts remain unclear.
- A `<!-- @reference <reference> -->` marker opens a block that `engrenage sync agents` fills with the referenced file, up to the next `@reference` or `<!-- @end -->` marker. Never edit blocks in place: add project rules after an `@end` marker, or change the referenced source.
- AGENTS.md holds only rules every agent needs. Surface-specific detail lives in `.claude/rules/`, one file per surface. Neither holds feature documentation, file inventories, API details or records of recent changes.
- When a rule becomes mechanically enforced, remove its prose. List it under the matching "Enforced by tooling" line only when its fix is not automatic and it shapes how code is first written; autofixed formatting and layout rules need no entry.

<!-- @reference @auaust/engrenage/agents/sections/precedence.md -->

## Precedence and conflicts

- Precedence: an explicit user decision for the current task, then the project's own instructions, then shared instructions from `@auaust/engrenage`, then existing code patterns. Existing code never justifies repeating a violation.
- When a request contradicts these rules, would create debt, or asks for an inappropriate abstraction, stop before implementing it: explain the issue and propose an alternative. If the user confirms, implement it as a one-time exception, never a precedent, and keep every other rule.
- When a conflict between rules, code and request has no clear resolution, ask instead of guessing.

<!-- @reference @auaust/engrenage/agents/sections/decision-protocol.md -->

## Decision protocol

Read user communication literally: questions are questions, not implied instructions or politely phrased demands.

- When the user asks "Shouldn't we do that instead?", explain the reasoning behind the current choice and compare the alternative's pros, cons and implications. Keep your judgment; the question alone neither authorizes a change nor requires reopening settled decisions.
- Treat exploratory questions as an effort to understand the work and its choices. Answer them without inferring a preferred outcome or a request to question everything. Change direction when the user explicitly requests or decides on it.

Pause on real choices: ask the questions and wait for the answers before continuing. When pausing is impossible, end the turn with the questions rather than proceeding on a guess.

- Obvious choice: one option is clearly better and fits the established architecture. Proceed, and report the decision with the alternative you discarded.
- Real choice: options are comparably good, each has significant costs, or a needed architectural contract is missing. Finish only work no open question affects, then pause with the batched questions (options, trade-offs, your recommendation), a short done/pending/blocked state, and enough context that the reply can contain only the answers.
- Follow implications as far ahead as possible before pausing, so questions arrive together rather than one patch at a time.
- When answers arrive, resume the same task. If they change earlier assumptions, pause again with a new batch. Silence never settles a real choice.
- Real choices include new infrastructure patterns, ownership boundaries, shared lifecycles, new role directories or namespaces, and unresolved behavioral policy. Propose the smallest coherent prerequisite instead of a temporary bypass or a silently created framework.

<!-- @end -->

## Issues and coordination

- When given a GitHub issue, read it and each parent issue it links, up to the root. Together with these instructions they define the task; task- and module-specific instructions live in issues, never here.
- Never resolve a conflict between this file, `.claude/rules/` and the issue chain yourself: stop on the affected item and report the conflict for human review.
- Before working on an issue, follow `.claude/rules/agent-lock.md`.

## Project and tools

- `@auaust/toolkit` is an ESM-only TypeScript utility library. Read the actual source, configuration and package scripts for current details.
- Use pnpm and the scripts in `package.json`. CI uses Node.js 24. TypeScript stays on the major required by `@auaust/engrenage`.
- Runtime utilities stay independent of application frameworks and platform-specific integrations. Node-only filesystem, process and build operations belong in `scripts/` and tooling configuration, never in runtime utilities.
- Toolkit is the package other AUAUST projects reuse. Inside it, reuse sibling helpers through the internal import paths; never depend on the published package or add a dependency for functionality provided here.
- Shared tooling configuration comes from `@auaust/engrenage`: the tsconfig preset, the `prettier` key in `package.json`, `eslint.config.ts`, the tsdown and Vitest builders (`tsdown.config.ts`, `vitest.config.ts`) that resolve entries and path aliases from `tsconfig.json`, and `engrenage.config.ts`. Extend its builders and presets locally instead of copying or redefining them.

## Source organization and public API

- One primary helper per file, in the module owning the kind of value it handles, or in `src/utils/` when it is type-agnostic. One reusable type per `src/types/<Name>.ts`, one error class per `src/errors/<Name>.ts`. Keep tightly coupled helpers, overloads and utility-specific types with their owner; split independent concepts into separate modules.
- Protocols live in `src/protocols/<name>/index.ts`. Preserve their symbol identities, `Symbol.for` keys, module augmentation and `ProtocolRegistry` contracts. Reuse `implementsProtocol` for protocol detection.
- Maintain the public barrels `src/index.ts`, `src/types.ts` and `src/errors.ts`. Keep root and subpath exports consistent with the intended API; never expose internal helpers.
- Preserve observable behavior: `this` binding, argument forwarding, return values, property descriptors, mutation, error causes and promise settlement. Changes to these or to exported types are API changes.
- Asynchronous and stateful utilities stay explicit about pending work, cleanup and errors. Follow each utility's documented scheduling and state contract rather than swallowing failures or changing timing.
- Preserve tree shaking and `sideEffects: false`: no observable initialization side effects, no unnecessary imports between independent utilities.
- The `is<Type>` helpers and the `object` module implement what the shared lint restrictions point to, so only they use native `typeof` checks and `Object.*`. Everywhere else in `src/`, use them.
- Build-time constants are defined in the `define` key of `engrenage.config.ts`. `engrenage sync globals` generates their declarations in `env.d.ts`; never edit that block by hand.

## Imports and types

- Import sibling helpers, reusable types, errors and protocols through the internal import paths the project configures (`package.json` `imports`). Never import the root barrel from runtime modules.
- Keep relative imports where tooling or type and error barrels need them, and keep tooling imports compatible with the configured ESM loaders.
- Types are public API. Preserve generic inference, literal types, overloads, type predicates, readonly tuples, optional and rest parameters, `this` parameters and synchronous or asynchronous return contracts.
- Prefer `unknown` for data that must be narrowed. Use `any` only where a generic constraint or another supported type contract needs it; do not replace it where that changes assignability or inference.
- Reusable type complexity lives in `src/types/`; types specific to one utility stay with it.

<!-- @reference @auaust/engrenage/agents/sections/implementation.md -->

## Implementation

- Quality takes precedence over feature completion. A functional workaround that introduces architectural debt is not a completed feature.
- Before editing, inspect the execution path, authoritative definitions and available abstractions. Place code with its established owner and reuse its models, utilities, configuration and contracts rather than building parallel implementations.
- Judge quality by clear ownership, authoritative definitions, explicit contracts, predictable execution and state lifetime, readability and minimal necessary complexity. Neither fewer lines nor more abstractions is inherently better.
- Extend established extension points autonomously. Several small utilities or files must not disguise a missing abstraction.
- Derive behavior from authoritative configuration, definitions, metadata or live data. Do not invent hardcoded catalogues, lists, status flags or example data.
- Fail clearly on missing invariants. Use fallbacks only when they belong to the intended contract.
- Avoid code comments; prefer a named function or descriptive variable. Comment only essential intent or constraints.
- Delete obsolete starter code and commented-out implementations. Do not add READMEs for features or a `docs/` directory.
- When work would build on or deepen an architectural violation, correcting it is a prerequisite: stop under the decision protocol with what is required, what exists, the recommended fix and its scope. Correct existing violations you touch.
- Report relevant nearby inconsistencies without fixing them. Do not do unsolicited cleanup.
- Keep secrets in `.env` (documented by `.env.example`), out of source, logs and runtime code.
- Propose missing or outdated skills, MCP servers, scripts, dependencies or abstractions when they would help. Never add, remove or upgrade them without the user's approval.

<!-- @reference @auaust/engrenage/agents/sections/backlog.md -->

## Backlog

- Record out-of-scope findings and user-deferred work in the shared backlog: questions, bugs, tasks and improvements. Start with `.ai/backlog/index.md` for categories and entry instructions.
- `.ai/scratchpad.md` holds user notes. Only when asked to handle the scratchpad, follow `.claude/rules/scratchpad.md`.

<!-- @reference @auaust/engrenage/agents/sections/typescript.md -->

## TypeScript

- Infer types from schemas, factories and API definitions instead of duplicating them. Preserve strict compiler settings and real optional contracts.
- Use interfaces for object shapes and type aliases for unions, functions and mapped types. Name types after the concept they carry. Never alias a mutable list (`Type[]`) under a new name; a read-only list (`readonly Type[]` or `ReadonlyArray<Type>`) may get one.
- Do not add `any`, casts, assertions, `@ts-*` directives or `eslint-disable` comments without a supported invariant. Disabled lint rules are not permission. Never add entries to `eslint-suppressions.json` unless explicitly requested.
- Validate data at external boundaries. Never hand-edit generated code, bundles or WebAssembly; change their sources and regenerate.

<!-- @end -->

## Toolkit implementation

- Preserve distinctions between missing values, `undefined`, `null` and other falsy values where the API distinguishes them.
- Document public contracts with concise JSDoc when needed: behavior, options, return values, mutation, timing and error semantics. Keep it accurate when behavior changes; never narrate the implementation.
- Once toolkit provides a helper for an operation, use it everywhere else instead of the native or ad hoc form.
- Keep configuration and build knowledge in its existing owner. Do not duplicate alias maps, entry-point discovery, package metadata or compile-time variables across modules.

## Code conventions

- Code style: `.claude/rules/code-style.md`.

## Scaffolding, build and packaging

- Build entries and test aliases are derived from the `tsconfig.json` paths by engrenage's tsdown and Vitest builders. Declare new entry points there.
- Package exports are generated by tsdown. Run `pnpm exec engrenage tsdown` after entry-point changes and review the `package.json` diff; never hand-edit `exports` or `dist/`.
- Preserve declaration generation, source maps, publint and Are the Types Wrong checks.

<!-- @reference @auaust/engrenage/agents/sections/verification.md -->

## Verification

- Before delivery, review the work against architectural boundaries and quality requirements, not only behavior.
- Tests live under the root `tests/`, organized by the area they exercise. Write the minimum needed for confidence, usually one expected case and one meaningful edge case. Reuse existing tests before adding new ones.
- Format only changed files, never the whole repository.
- Report actual results and blockers, including unavailable integrations and skipped checks. Never weaken compiler or lint settings to hide failures.

<!-- @end -->

## Toolkit tests

- Tests mirror the source areas: `tests/utils/`, `tests/modules/`, `tests/types/`, `tests/protocols/`, with package and shared protocol tests at the root. Never add tests under `src/`.
- All tests for a helper, including type assertions and inference regressions, stay in its `<name>.test.ts`. Split cross-helper work among each helper's own file.
- Test public behavior through package imports so source and built-package modes exercise the same contracts. Assert changed type contracts with `expectTypeOf` or `assertType`.
- Cover the relevant edge cases: empty input, optional values, errors, `this` binding, argument preservation and asynchronous outcomes. Control timers deterministically and restore timers and mocks after use.

## Commands

- `pnpm exec vitest run --config vitest.config.ts --typecheck <test-path>` for focused tests.
- `pnpm lint` and `pnpm typecheck` for source changes; `pnpm test` runs the source suite and type checking. Source-mode Vitest removes `dist/`, so run it before a final build.
- `pnpm build` for exports, aliases, declarations, compile-time metadata or bundling changes. It builds, validates packaging and reruns the tests against `dist/`. `pnpm ci:check` runs the engrenage sync check, type checking and lint; `pnpm ci` runs it, then the tests and the build.
- `pnpm format <files>` on changed files only.
- `pnpm exec engrenage sync` after upgrading `@auaust/engrenage`; it regenerates the reference blocks, `env.d.ts` and the other derived files.
- Add a changeset for any change that should be released.
