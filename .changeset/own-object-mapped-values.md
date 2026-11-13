---
"@auaust/toolkit": minor
---

- Fix generic object inference in mappedValues and value-only mapped calls.
- Map every own string and symbol object key, including non-enumerables, and exclude inherited keys in mappedValues and value-only mapped calls.
