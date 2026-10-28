---
paths:
  - "**/*.ts"
---

<!-- @reference @auaust/engrenage/agents/rules/code-style.md -->

# Code style

## Enforced by tooling

- Prettier (`@auaust/engrenage/prettier`) and ESLint (`@auaust/engrenage/eslint`) enforce formatting and layout. Run ESLint with `--fix` on changed files, then resolve the remaining messages; each names the expected form.
- Not fixed automatically, so write them correctly from the start: concise arrow bodies limited to an identifier, literal, member access, negation, comparison, call or template literal; `x == null` for nullish checks; runtime `typeof` only as `typeof x === "undefined"`; named exports outside tool configs and declared default-export files; static imports in source directories; every promise awaited, returned or `void`ed, and never spread or tested for truthiness; `await` only on values that may be promises; test files only under the test directories.

## Not checked by tools

- camelCase for functions and variables, PascalCase for classes, components and types. Keep the `create…`, `use…`, `define…`, `get…`, `is…`, `has…` prefixes. Never rename platform-defined identifiers.
- Separate sibling statements with one blank line by default. Only two or three short, simple declarations of the same kind may stay together. A long or complex declaration (a call with a callback, a conditional, a template with several interpolations) stands alone, and once one does, its siblings follow suit.
- Put substantial computation, awaited calls, method chains and mapped or filtered arrays on their own lines when they are distinct steps.
- A concise arrow body that Prettier would wrap becomes a block with an explicit `return`.
- Module-level named functions are `function` declarations; a `const` arrow is only for a logic-free wrapper.
- Factories returning APIs define methods as named local functions and expose them through shorthand properties.
- No statement-spacing blank lines inside object literals, arrays or argument lists.

<!-- @end -->

## Toolkit additions

- Use TypeScript for authored library, test and tooling code.
- Name files after their primary concept, following the existing function, type, error and protocol conventions.
- Export-only barrels keep their exports contiguous.
- Keep getters and setters where property access belongs to the contract.
