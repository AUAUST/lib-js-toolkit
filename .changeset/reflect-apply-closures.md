---
"@auaust/toolkit": patch
---

`pipe`, `pipeAsync`, `spy`, `throttle` and `voided` invoke a function even when it has its own `call` or `apply` property.
