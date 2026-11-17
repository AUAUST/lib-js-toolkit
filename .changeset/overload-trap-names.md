---
"@auaust/toolkit": patch
---

- Type `overload` trap keys as `TrapName`, rejecting other keys
- Omit non-trap keys from `OverloadTraps` instead of typing them `never`
