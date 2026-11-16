---
"@auaust/toolkit": minor
---

- The root entry exports toCamelCase, toPascalCase, toKebabCase, toSnakeCase, toTitleCase, toDelimitedCase, toSlug with their shorthands camel, pascal, kebab, snake, title and slug, plus once, debounce, throttle, sleep and freeze
- isSelf moves from general to object; breaking: `@auaust/toolkit/general` no longer exports isSelf, import it from `@auaust/toolkit/object` or the root
