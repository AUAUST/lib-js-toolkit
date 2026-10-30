---
paths:
  - "src/**/*.ts"
---

# Naming

## Helpers

- Use the infinitive of the action, and spell out conditions instead of qualifiers: `memoize`, not `memoized`; `isNonEmptyString`, not `isStrictString`.
- Prefer the standard name over a home-made one: `uncapitalize`, after TypeScript's `Uncapitalize`, not `decapitalize`.
- The native or established name is canonical, and a concise alias sits next to it: `toUpperCase`, aliased `upper`. Families follow the same pattern (`toKebabCase`, aliased `kebab`), and a main use is named like its variants: `afterFirst` next to `afterLast`, aliased `after`.
- Asynchronous variants take the `Async` suffix: `attempt`, `attemptAsync`.
- When the infinitive is a reserved word, use the past participle, never an affix: `voided`, not `void_`.
- A function returned by a helper is named after the past participle of the helper's verb: `spy` returns `function spied`, `cache` returns `function cached`.

## Signatures

- Helpers with the same name in different modules share the concept and the signature shape, subject first: `array.includes(array, item)` and `string.includes(string, substring)`.
- Conceptually close helpers share a signature shape: `find` and `filter`, `map`, `transform` and `forEach`.
- A helper next to a native one follows its form: `math.sum(...numbers)` takes rest arguments, like `Math.min` re-exported as `math.min`.

## Mutating and copying variants

- A helper mutates its subject only when its verb acts on it: `sort`, `reverse`, `pull`, `pop`. Verbs that read or derive never mutate: `map`, `pluck`, `get`, `last`, `forEach`.
- The copying variant of a mutating helper is `to` plus the past participle, as native ones: `sort`/`toSorted`, `reverse`/`toReversed`. Converters are `to` plus a type: `toArray`.
- A non-mutating helper never gets a mutating homonym or a `to…` copy: never `map`/`toMapped`. A mutating counterpart, when worth it, takes its own verb: `map`/`transform`.
- A helper copying by design has no in-place variant and no `to…` form: `pluck`, never `toPlucked`.

## Guards, protocols, modules, types and constants

- Guards: `isString`, `isNotString`, `isEmptyString`.
- Protocols: symbol `callable`, interface `Callable`, key `Symbol.for("Protocol.callable")`.
- Modules are singular, one lowercase word, named after the contract when grouping by one: `string`, `maplike`. Role directories are plural: `utils`, `types`.
- Constants are camelCase: `whitespacePattern`, never `WHITESPACE_PATTERN`.
- A renamed type keeps no alias for its old name.

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
