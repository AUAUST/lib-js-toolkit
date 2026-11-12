# Agent instructions

## 1. Rules made stale by the merge

- Two rules still conflict with planned helpers: the type-dispatch helper (#113) needs native `typeof` outside the `is<Type>` helpers, and lowercase short assertions (#115) conflict with the camelCase rule.
- Outcome: both rules updated with the user's consent, and the matching engrenage rules upstream in one batch.
- Done when the rules match those helpers.
