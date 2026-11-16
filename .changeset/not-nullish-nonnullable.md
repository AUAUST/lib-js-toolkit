---
"@auaust/toolkit": minor
---

- guard.isNotNullish, assert.assertNotNullish and ensure.ensureNotNullish narrow to `NonNullable<Candidate>`; breaking: `unknown` now narrows to `{}` instead of staying `unknown`
