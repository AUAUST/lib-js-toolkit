---
paths:
  - "src/**/*.ts"
---

# Naming

## Helpers

- Use the infinitive of the action, and spell out conditions instead of qualifiers: `memoize`, not `memoized`; `isNonEmptyString`, not `isStrictString`.
- Prefer the standard name over a home-made one: `uncapitalize`, after TypeScript's `Uncapitalize`, not `decapitalize`.
- The native or established name is canonical, and a concise alias sits next to it: `toUpperCase`, aliased `upper`. Families follow the same pattern (`toKebabCase`, aliased `kebab`), and a main use is named like its variants: `afterFirst` next to `afterLast`, aliased `after`.
- Helpers with the same name in different modules share the concept and the signature shape, subject first: `array.includes(array, item)` and `string.includes(string, substring)`.
- Asynchronous variants take the `Async` suffix: `attempt`, `attemptAsync`.
- When the infinitive is a reserved word, use the past participle, never an affix: `voided`, not `void_`.

## Guards, protocols, modules and constants

- Guards: `isString`, `isNotString`, `isEmptyString`.
- Protocols: symbol `callable`, interface `Callable`, key `Symbol.for("Protocol.callable")`.
- Modules are singular, one lowercase word, named after the contract when grouping by one: `string`, `maplike`. Role directories are plural: `utils`, `types`.
- Constants are camelCase: `whitespacePattern`, never `WHITESPACE_PATTERN`.

## Parameters

| Parameter                                    | Name                      | Example                                                       |
| -------------------------------------------- | ------------------------- | ------------------------------------------------------------- |
| Checked value of a guard                     | `candidate`               | `isString(candidate)`                                         |
| Subject of a typed helper                    | its type, without `Like`  | `string.trim(string)`, `maplike.getOrSet(map, key, fallback)` |
| Type-agnostic subject, only read or returned | `value`                   | `count(value)`                                                |
| Type-agnostic subject, turned into a result  | `input`                   | `toString(input)`                                             |
| Function with a purpose                      | its role                  | `array.filter(array, predicate)`                              |
| Function kept by the returned value          | `closure`                 | `memoize(closure)`                                            |
| Function called after the helper returns     | `callback`                | `after(callback, delay)`                                      |
| Function used only during the call           | `fn`                      | `attempt(fn)`                                                 |
| Any other parameter                          | its role; plural for rest | `object.assign(object, ...sources)`                           |

A `closure` is resolved once with `toFunction`; a `callback` or `fn` is invoked directly with `call`.
