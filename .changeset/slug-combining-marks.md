---
"@auaust/toolkit": patch
---

- string.toSlug keeps combining marks with `unaccent: false` and normalizes slugs to NFC, so NFC and NFD input give the same slug
