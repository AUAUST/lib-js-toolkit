---
paths:
  - src/**
---

# Project map: src

```
src/  (global roles: errors types constants.ts symbols.ts)
└─ modules/  #modules/…  [domains]  One module per kind of value, each a package entry.
   ├─ array*  Helpers over arrays.
   ├─ assert*  Assertions throwing when a guard fails.
   ├─ async*  Helpers over promises and asynchronous values.
   ├─ boolean*  Helpers over booleans.
   ├─ composer*  Compose objects from getters, properties and values.
   ├─ ensure*  Helpers returning a value once a guard passes, throwing otherwise.
   ├─ forwarder*  Forward properties and methods from one object to another.
   ├─ function*  Helpers over functions and callables.
   ├─ general*  Type-agnostic helpers, exposed flat at the root.
   ├─ guard*[collects: guards]  Every type predicate of the toolkit, exposed flat and as a namespace.
   ├─ iterable*  Helpers over iterables.
   ├─ maplike*  Helpers over maps and map-like collections.
   ├─ math*  Math helpers and native Math statics.
   ├─ number*  Helpers over numbers.
   ├─ object*  Object helpers and native Object statics.
   ├─ parse*  Parsers converting unknown input to a type.
   ├─ protocol*  Protocol symbols, their types and detection.
   ├─ setlike*  Helpers over sets and set-like collections.
   └─ string*  Helpers over strings.
```
