# Merge

Questions to settle before migration agents batch-import primitive-kit (AUAUST/lib-js-toolkit#103). #103, #112 and the plan #120 are closed (#103 and #112 as not planned) without settling these questions, so they have no owning issue left. Entries are ordered so earlier answers unblock later ones; remove an entry once answered.

## 1. Documentation: migration guide for primitive-kit users

- A primitive-kit → toolkit mapping (name, subpath, behaviour change) would help dependents and could be derived from the trackers' rows. Related: `documentation` › "README lacks domain overviews".
- Done when it is decided whether the guide exists, where, and whether it is generated.

## 2. Dependents: freeze and deprecation

- #112 questions 1 and 3: final primitive-kit release pointing to toolkit, `@deprecated` JSDoc per export, `npm deprecate` (a manual public action).
- Done when decided.

## 3. Dependents: migration timing

- #112 question 2: migrate each dependent as its modules land, or all at the end. Engrenage is affected twice: it imports primitive-kit and toolkit's dropped per-helper subpaths (AUAUST/lib-js-engrenage#46). The compatible release order is recorded in #112.
- Done when decided.
