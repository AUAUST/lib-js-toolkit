# Documentation

## 1. README lacks domain overviews

- The generalities of each domain (utils, types, errors, protocols, modules) are only discoverable by reading the source.
- Outcome: the root `README.md` documents each domain's purpose and conventions, ideally generated through engrenage's README sync (AUAUST/lib-js-engrenage#22).
- Done when every public domain has an overview in the README.

## 2. Agent skill for toolkit

- Agents discover toolkit's helpers by reading the source. A generated skill would list every helper with a dense description, so an agent that installs it knows the library's capabilities at once.
- Proposal: toolkit exposes a skill entry point generated from the helpers' JSDoc (description, `@native` and `@relates` tags, #183), distributed to consumers through pnpm dependency skills.
- Outcome: the skill format and its generation from JSDoc decided.
- Done when toolkit publishes a generated skill, or obsolete if skills turn out not to fit.

## 3. Examples derived from tests

- Settled in AUAUST/lib-js-toolkit#103: JSDoc never contains `@example`, because hand-written examples drift.
- Proposal: each test file has a dedicated example suite showing illustrative usage; examples are generated from it, so they are correct by construction.
- Outcome: decide whether examples are generated, and where they appear (JSDoc, README, skill).
- Done when decided, or obsolete if examples are dropped for good.
