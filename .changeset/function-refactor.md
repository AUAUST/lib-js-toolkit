---
"@auaust/toolkit": minor
---

- Rename resolveCallable to toFunction, also exported at the root
- Rename cached, cachedAsync and memoized to cache, cacheAsync and memoize
- Remove the CachedFn and MemoizedFn type aliases
- Rename the functions returned by cache and cacheAsync to cached, and by memoize to memoized
- Accept callable objects in after, apply, applyMethod, callMethod, debounce, spy and throttle
- Rename the function returned by debounce to debounced
- Rename the function returned by spy to spied
- Rename the function returned by throttle to throttled
- Update AsyncCallable and AsyncFn to require a promise result
- Update MaybeAsyncFn to accept only functions
- Update UnknownFn to accept any arguments
