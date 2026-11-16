---
"@auaust/toolkit": minor
---

- async.awaitAll resolves any non-array iterable to an array of its settled values; breaking: a `Map` now resolves to an array of its entries instead of `{}`
