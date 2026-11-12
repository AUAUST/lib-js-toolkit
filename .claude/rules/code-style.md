---
paths:
  - "**/*.ts"
---

<!-- @reference @auaust/engrenage/agents/rules/code-style.md -->

# Code style

## Enforced by tooling

- Prettier (`@auaust/engrenage/prettier`) and ESLint (`@auaust/engrenage/eslint`) enforce formatting and layout. The commit gate applies their fixes; resolve the messages it reports, each naming the expected form.

Write these correctly from the start, since no tool fixes them:

- Check for nullish values with `x == null`.
- Use runtime `typeof` only as `typeof x === "undefined"`.
- Use named exports, except in tool configs and declared default-export files.
- Never `import()` a module the same file imports statically.
- Await, return or `void` every promise, and never spread it or test it for truthiness.
- Use `await` only on values that may be promises.
- Put test files only under the test directories.
- Write each `@debt` marker as `@debt <statement>` at the start of its own comment.

## Not checked by tools

- Prefer static imports; reserve `import()` for code that gains from loading later.
- camelCase for functions and variables, PascalCase for classes, components and types. Keep the `create…`, `use…`, `define…`, `get…`, `is…`, `has…` prefixes. Never rename platform-defined identifiers.
- Separate sibling statements with one blank line; only a run of two or three declarations of the same kind may stay together, and only when each fits on one line with no callback, conditional or template of several interpolations.
- Put substantial computation, awaited calls, method chains and mapped or filtered arrays on their own lines when they are distinct steps.
- Module-level named functions are `function` declarations; a `const` arrow is only for a logic-free wrapper.
- Factories returning APIs define methods as named local functions and expose them through shorthand properties.
- No statement-spacing blank lines inside object literals, arrays or argument lists.

<!-- @end -->

## Toolkit additions

- Use TypeScript for authored library, test and tooling code.
- Keep getters and setters where property access belongs to the contract.
