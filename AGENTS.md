# AGENTS.md

Apply throughout the repository. Follow these rules in changed code; preserve unrelated work. Existing code may predate these standards and is not a reason to repeat a conflicting pattern or reformat unrelated files.

## Project and tooling

- This is `@auaust/toolkit`, a TypeScript utility library published as an ESM package. Use the actual source, configuration, and package scripts for current project details.
- Use pnpm and the version declared in `package.json`. The project uses TypeScript, Vitest, tsdown, and tsx; CI uses Node.js 24. Preserve the existing build and test pipelines.
- Keep runtime utilities independent of application frameworks and platform-specific integrations. Reuse existing utilities within this package rather than importing the published package as an external dependency or adding a dependency for functionality already provided here.
- Keep Node-only filesystem, process, and build operations in `scripts/`, `codegen/`, and tooling configuration. Do not introduce Node-only dependencies into general-purpose runtime utilities.

## Implementation

- Read surrounding code and involved utilities, types, protocols, and tests before editing. Match their vocabulary and abstractions; keep changes focused.
- Use small functions and descriptive intermediate values. Reuse existing utilities and contracts rather than duplicating knowledge or introducing parallel implementations.
- Fail clearly on missing invariants. Use fallbacks only when they belong to the intended contract. Preserve distinctions between missing values, `undefined`, `null`, and other falsy values where the API distinguishes them.
- Avoid implementation comments. First improve legibility by extracting a named function or introducing a descriptive intermediate variable. Reserve comments for essential intent or constraints that cannot be expressed clearly in code.
- Use concise JSDoc to document public contracts when needed: behavior, options, return values, mutation, timing, and error semantics. Keep it accurate when changing behavior; do not narrate the implementation.
- Do not add README files for newly added features or create a `docs/` directory. Update existing documentation when the public contract needs clarification.
- Keep configuration and build knowledge in their existing owners. Do not duplicate alias maps, entry-point discovery, package metadata, or compile-time variables across modules.

## Formatting

- Use TypeScript for authored library, test, and tooling code.
- Use two-space indentation, double quotes, semicolons, LF, and a final newline. Keep JSON, YAML, and other file formats valid in their own syntax.
- Use camelCase for functions and variables and PascalCase for classes, interfaces, and types. Name files after their primary concept, following the existing function, type, error, and protocol conventions.
- Prefer named exports. Preserve default exports required by tooling configuration.
- Always brace control-flow bodies, including single-statement conditions, loops, and guards. Keep normal `else if` chains.
- Non-empty object literals are multiline, with each property or spread on its own line, including arguments, nested expressions, and returns. Empty objects are allowed. This rule does not apply to destructuring, imports, or object types.
- Default to one blank line between sibling statements at any nesting depth. No blank line immediately inside a block's opening or closing brace. Keep `else`, `catch`, and `finally` attached.
- Group declarations and assignments by nature and purpose: acquired dependencies, locally created helpers, constants, and reassignable bookkeeping. Adapt groups to the code and preserve execution order. Do not group by keyword or function prefix alone.
- Within a coherent group, short declarations and assignments may stay together: literals, references, property accesses, simple operators, and synchronous setup calls. Nested arguments alone do not require separation.
- Separate substantial computation, awaited operations, method chains, mapped or filtered arrays, and multiline expressions when they form distinct steps.
- Very small functions or callbacks whose statements are all short and simple may omit blank lines between statements, including between an assignment and a call. Prefer compact spacing when blank lines reduce legibility. This exception does not relax braces, object layout, or callback-body rules.
- Keep imports together. Prefer contiguous exports in export-only barrel files. Do not insert statement-spacing blanks between object properties, array items, or arguments, or between overload signatures and their implementation.
- Arrow functions use blocks and explicit returns for produced values. Concise bodies are allowed only for single-line expressions roughly 20 characters or fewer. Wrapped bodies and object returns always use blocks; returned object literals are multiline.
- Factories returning APIs, including callable objects with attached methods, define methods as named local function declarations and expose them through shorthand properties or references. Do not implement API methods inline in returned objects or assignments. Preserve getters and setters when property access belongs to the contract.
- Format only changed files. If Prettier is available, run it only on changed files and inspect its output for compliance; it does not enforce all these rules. The repository currently has no configured formatter or lint script; do not invent commands or add tooling merely to format a change.

## Imports and types

- Use static imports and the aliases configured in `tsconfig.json`. Import sibling utilities through their `@auaust/toolkit/<function>` subpaths, reusable types through `@auaust/toolkit/types`, and errors and protocols through their existing subpaths. Avoid importing the root barrel from runtime implementation modules.
- Preserve relative imports where appropriate for tooling and type or error barrels. Keep tooling imports compatible with the configured ESM loaders.
- Consolidate imports from each module and mark type-only imports and exports, respecting `verbatimModuleSyntax`.
- Preserve strict compiler settings and actual optional or undefined contracts. Narrow required values or establish an invariant before asserting them.
- Prefer inference and existing utility types over duplicated signatures. Keep reusable type complexity in `src/types/`; keep types specific to a single utility alongside that utility.
- Treat types as part of the public API. Preserve generic inference, literal types, overloads, type predicates, readonly tuples, optional and rest parameters, `this` parameters, and synchronous or asynchronous return contracts where applicable.
- Prefer `unknown` for unconstrained data that must be narrowed. Use `any` only where needed for a generic function constraint or another supported type contract; do not mechanically replace it where doing so changes assignability or inference.
- Do not copy existing casts, non-null assertions, or suppressions without a supported invariant. Validate unknown input when the utility's contract requires it; do not add schema libraries or defensive conversions without a concrete need.

## Source organization and public API

- Default to one primary utility per `src/functions/<name>.ts`, one reusable type per `src/types/<Name>.ts`, and one error class per `src/errors/<Name>.ts`. Keep tightly coupled helpers, overloads, and utility-specific types with their owner; split independent concepts into separate modules.
- Protocols live in `src/protocols/<name>/index.ts`. Preserve their symbol identities, `Symbol.for` keys, module augmentation, and `ProtocolRegistry` contracts. Reuse `implementsProtocol` for protocol detection where appropriate.
- Maintain the appropriate public barrels: `src/index.ts`, `src/types.ts`, and `src/errors.ts`. Keep root and subpath exports consistent with the intended API; do not expose internal helpers accidentally.
- Preserve observable behavior such as `this` binding, argument forwarding, return values, property descriptors, mutation, error causes, and promise settlement. Treat changes to these behaviors or to exported types as API changes.
- Keep asynchronous and stateful utilities explicit about pending work, cleanup, and errors. Follow each utility's documented scheduling and state contract rather than silently swallowing failures or changing timing semantics.
- Preserve tree shaking and the package's `sideEffects: false` contract. Avoid new observable initialization side effects and unnecessary imports between independent utilities.
- Keep build-time metadata declarations in `src/ambient.d.ts` aligned with substitutions defined in `codegen/index.ts`.

## Scaffolding, build, and packaging

- Use the existing scaffolding when helpful: `pnpm make function <name>`, `pnpm make type <Name>`, and `pnpm make protocol <name>`. These commands create source and test files and may update barrels; inspect their output and replace placeholders before considering the work complete.
- Scaffolded source and tests are authored files after creation. Edit them normally. Update `codegen/templates/` when changing scaffold conventions, rather than treating templates as a separate standard.
- `codegen/index.ts` derives build entries and test aliases from `tsconfig.json`. Keep new entry points consistent with that configuration and the existing discovery workflow.
- Package exports are generated by tsdown. Run `pnpm build:tsdown` to regenerate them after entry-point changes and review the resulting `package.json` diff. Do not hand-edit `dist/` or maintain a parallel generated export map.
- Preserve declaration generation, source maps, publint, and Are the Types Wrong checks in the build configuration. Do not disable checks to make a change pass.
- Use the existing Changesets workflow for release notes and versioning when a change requires a release. Do not hand-edit generated changelog entries or publish as part of routine implementation work.

## Verification

- Keep tests under root `tests/`, organized by source area: `tests/functions/`, `tests/types/`, and `tests/protocols/`, with package and shared protocol tests at the root. Use `<name>.test.ts`; never add tests under `src/`.
- Test public behavior through package imports so the existing source and built-package test modes can exercise the same contracts. Add meaningful regression coverage for changed behavior and type assertions with Vitest's `expectTypeOf` or `assertType` for changed type contracts.
- Cover relevant edge cases such as empty input, optional values, errors, `this` binding, argument preservation, and asynchronous outcomes. For timing changes, prefer deterministic timer control where appropriate and restore timers or mocks after use.
- Run focused tests with `pnpm exec vitest run --config vitest.config.ts --typecheck <test-path>`. Run `pnpm typecheck` for TypeScript changes and `pnpm test` for the full source suite and compiler checks when warranted by scope.
- Run `pnpm build` for public exports, aliases, imports, declarations, compile-time metadata, or bundling changes. It builds with tsdown, validates packaging, and runs tests against `dist/`. `pnpm ci:prepare` runs type checking followed by this build workflow.
- Source-mode Vitest removes `dist/` during configuration; run source tests before the final build when both are needed. Review generated package changes after building and preserve unrelated work.
- Review changed files against these standards even when automated checks pass. Report actual results and blockers, including unavailable tools and skipped checks. Do not weaken compiler settings or change unrelated tooling to hide failures.
