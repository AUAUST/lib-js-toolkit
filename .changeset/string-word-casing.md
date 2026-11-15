---
"@auaust/toolkit": minor
---

- Add unaccent
- Add splitWords
- Add toCamelCase, toPascalCase, toKebabCase and toSnakeCase
- Add toTitleCase and toDelimitedCase
- Add toSlug
- Rename toCustomCase to toDelimitedCase and slug to toSlug
- Align the unaccent default on splitWords (off) in every converter except toSlug (on)
- Drop ignoreCaps: case changes always split words, toSlug included
