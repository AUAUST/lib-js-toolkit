export { after } from "#utils/after";
export { apply, type Apply } from "#utils/apply";
export { applyMethod } from "#utils/applyMethod";
export { attempt, type AttemptResult } from "#utils/attempt";
export { attemptAsync } from "#utils/attemptAsync";
export {
  cached,
  type Cached,
  type Cached as CachedFn,
  type CachedOptions,
  type CacheResolver,
  type KeyResolver,
} from "#utils/cached";
export { cachedAsync, type CachedAsync } from "#utils/cachedAsync";
export { call, type Call } from "#utils/call";
export { callMethod } from "#utils/callMethod";
export { comparator } from "#utils/comparator";
export {
  compare,
  type AvailableOperators,
  type BinaryOperator,
  type CustomOperators,
  type DisabledOperators,
  type Operator,
  type OperatorFn,
  type UnaryOperator,
} from "#utils/compare";
export { constant } from "#utils/constant";
export { count } from "#utils/count";
export { debounce, type Debounced } from "#utils/debounce";
export {
  defer,
  type DeferPromise,
  type PromiseRejecter,
  type PromiseResolver,
} from "#utils/defer";
export { empty } from "#utils/empty";
export { expose, type Expose } from "#utils/expose";
export { filled } from "#utils/filled";
export { frozen } from "#utils/frozen";
export { identity } from "#utils/identity";
export {
  keyMapper,
  type KeyMap,
  type KeyMapper,
  type KeyMapping,
  type NormalizedKey,
  type NormalizedKeyMapping,
} from "#utils/keyMapper";
export { mapped } from "#utils/mapped";
export {
  mappedKeys,
  type FunctionMappedKey,
  type MappedSource,
  type RecordMappedKey,
} from "#utils/mappedKeys";
export { mappedValues } from "#utils/mappedValues";
export { match } from "#utils/match";
export { md5 } from "#utils/md5";
export { measure, type MeasureResult } from "#utils/measure";
export { measureAsync } from "#utils/measureAsync";
export { memberValue, type MemberValue } from "#utils/memberValue";
export {
  memoized,
  type Memoized,
  type Memoized as MemoizedFn,
  type MemoizedOptions,
} from "#utils/memoized";
export { noop } from "#utils/noop";
export { now } from "#utils/now";
export { on } from "#utils/on";
export { once, type OnceFn } from "#utils/once";
export {
  pipe,
  type PipeCondition,
  type PipeEntry,
  type TransformFn,
} from "#utils/pipe";
export {
  pipeAsync,
  type AsyncPipeEntry,
  type AsyncTransformFn,
} from "#utils/pipeAsync";
export { plain } from "#utils/plain";
export { readonly } from "#utils/readonly";
export { resolveCallable } from "#utils/resolveCallable";
export { sleep } from "#utils/sleep";
export { spy, type SafeParameters, type SafeReturnType } from "#utils/spy";
export {
  stopwatch,
  type Lap,
  type Period,
  type Stopwatch,
  type StopwatchOptions,
} from "#utils/stopwatch";
export { tap } from "#utils/tap";
export { throttle, type Throttled } from "#utils/throttle";
export { transform } from "#utils/transform";
export { transformKeys } from "#utils/transformKeys";
export { transformValues } from "#utils/transformValues";
export {
  value,
  type ResolvableValue,
  type ResolvedValue,
  type ResolvableValue as Value,
  type ValueInput,
  type ValueResolver,
} from "#utils/value";
export { voided, type Voided } from "#utils/voided";
export { when } from "#utils/when";

export * from "#errors/index";
export * as array from "#modules/array/index";
export * as assert from "#modules/assert/index";
export * as async from "#modules/async/index";
export * as boolean from "#modules/boolean/index";
export * as composer from "#modules/composer/index";
export * as forwarder from "#modules/forwarder/index";
export * as function from "#modules/function/index";
export * from "#modules/guard/index";
export * as guard from "#modules/guard/index";
export * as iterable from "#modules/iterable/index";
export * as maplike from "#modules/maplike/index";
export * as math from "#modules/math/index";
export * as number from "#modules/number/index";
export * as object from "#modules/object/index";
export * as parse from "#modules/parse/index";
export * as protocol from "#modules/protocol/index";
export * as setlike from "#modules/setlike/index";
export * as string from "#modules/string/index";
export * from "#types/index";

import { frozen } from "#utils/frozen";

export const BUILD = frozen({
  name: __NAME__,
  version: __VERSION__,
  license: __LICENSE__,
});
