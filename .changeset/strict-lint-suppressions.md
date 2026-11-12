---
"@auaust/toolkit": patch
---

- `compare` with `"="` compares the resolved values as strings, so `true = 1` and `0 = ""` are now `false`
- A `debounce` call made from inside the debounced callback now runs with its own arguments instead of losing them
