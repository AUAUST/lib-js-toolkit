---
"@auaust/toolkit": patch
---

Fix `after()` to reject its promise when a delayed callback throws synchronously instead of leaving the promise pending
