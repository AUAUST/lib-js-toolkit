---
"@auaust/toolkit": minor
---

- Remove the per-helper subpath exports; import helpers from the root or from their module entry
- Replace the `protocols` entries with a single `protocol` entry
- Rename the `countOf` protocol symbol to `countable` and the `isEmpty` protocol symbol to `emptiable`
- Re-export every module from the root as a namespace
- Add the `array`, `assert`, `async`, `boolean`, `function`, `guard`, `iterable`, `maplike`, `number`, `parse`, `setlike` and `string` entries, empty for now
