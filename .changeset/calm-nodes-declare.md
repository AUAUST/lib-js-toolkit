---
"@auaust/toolkit": patch
---

- Declare the supported runtimes: Node.js 22 or later and the Widely Available Baseline of 2026-10-30
- Keep the original stack of a `PipelineError` cause only when the cause has one
- Add the `PropertyDescriptorInput` type and accept it in `object.defineProperty`, `object.defineProperties`, `object.create`, `DefinedProperties`, `DescriptorValue` and the property composers, so descriptor members may be explicitly `undefined`
- Accept an explicit `undefined` for the `cached`, `memoized` and `stopwatch` options
