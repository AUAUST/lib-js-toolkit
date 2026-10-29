# Utils

## 1. No safe access to native object methods

- Calling `x.valueOf()`, `x.toString()` and similar fails on null-prototype objects, and toolkit offers no helpers for these native operations.
- Outcome: helpers in `src/utils/` that invoke the `Object.prototype` (or matching built-in) methods so null-prototype objects work safely.
- Done when the helpers are published, or obsolete if the type-dispatch work (AUAUST/lib-js-toolkit#113) covers them.
