# Merge

Questions to settle before migration agents batch-import primitive-kit (AUAUST/lib-js-toolkit#103). The order of work and the issues in discussion are tracked in the plan (#120). Entries are ordered so earlier answers unblock later ones. An answer is recorded in the "Settled" section of the issue owning the question (process decisions in #103), then its entry is removed. Linked backlog entries are removed with it when the answer resolves them.

## 1. Dispatch: name and module

- #113 questions 1 and 3: `overload`, `dispatch`, `byType`, `typeSwitch`, `polymorphic`; in the `function` module?
- Done when decided.

## 2. Dispatch: function trap

- #113 question 2: functions go to `object`, get a `function` trap, or a grouping trap (`container`) like `nullish`.
- Done when decided.

## 3. Dispatch: introspection

- #113 question 5: expose the traps (to extend later) or stay opaque.
- Done when decided.

## 4. Documentation: `@behavior` tag during the migration

- Proposed: a custom JSDoc tag giving the minimal behaviour an agent needs to decide whether to use a helper, usually one line (`@behavior Equivalent to Array.prototype.map`), read by the generated agent skill (`documentation` › "Agent skill for toolkit"). The JSDoc rules for the migration are otherwise settled (#103).
- Done when it is decided whether migration agents write the tag now, with its wording rule, or it is added later.

## 5. Documentation: migration guide for primitive-kit users

- A primitive-kit → toolkit mapping (name, subpath, behaviour change) would help dependents and could be derived from the trackers' rows. Related: `documentation` › "README lacks domain overviews".
- Done when it is decided whether the guide exists, where, and whether it is generated.

## 6. Dependents: freeze and deprecation

- #112 questions 1 and 3: final primitive-kit release pointing to toolkit, `@deprecated` JSDoc per export, `npm deprecate` (a manual public action).
- Done when decided.

## 7. Dependents: migration timing

- #112 question 2: migrate each dependent as its modules land, or all at the end. Engrenage is affected twice: it imports primitive-kit and toolkit's dropped per-helper subpaths (`engrenage` › "Lint rules assume per-helper toolkit subpaths"). The compatible release order is recorded in #112.
- Done when decided.
