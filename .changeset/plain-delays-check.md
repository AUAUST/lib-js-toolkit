---
"@auaust/toolkit": minor
---

- Fix `compare` throwing on the `"="` operator when exactly one side is nullish
- Reject a `debounce` delay that is not a number (`TypeError`) or is negative (`RangeError`), like `throttle`
- Fix `throttle` adding a non-number interval to the cooldown without coercing it
