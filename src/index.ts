export { after } from "@auaust/toolkit/after";
export { apply } from "@auaust/toolkit/apply";
export { attempt, type AttemptResult } from "@auaust/toolkit/attempt";
export { attemptAsync } from "@auaust/toolkit/attemptAsync";
export {
  cached,
  type CachedFn,
  type CachedOptions,
} from "@auaust/toolkit/cached";
export { call } from "@auaust/toolkit/call";
export { comparator } from "@auaust/toolkit/comparator";
export {
  compare,
  type AvailableOperators,
  type BinaryOperator,
  type CustomOperators,
  type DisabledOperators,
  type Operator,
  type OperatorFn,
  type UnaryOperator,
} from "@auaust/toolkit/compare";
export { constant } from "@auaust/toolkit/constant";
export { count } from "@auaust/toolkit/count";
export { debounce } from "@auaust/toolkit/debounce";
export {
  defer,
  type DeferPromise,
  type PromiseRejecter,
  type PromiseResolver,
} from "@auaust/toolkit/defer";
export { empty, type EmptyValue } from "@auaust/toolkit/empty";
export { expose } from "@auaust/toolkit/expose";
export { filled, type FilledValue } from "@auaust/toolkit/filled";
export { forward, type Forwarded } from "@auaust/toolkit/forward";
export { forwardAs, type ForwardAs } from "@auaust/toolkit/forwardAs";
export {
  forwardMethods as forwardCalls,
  forwardMethods,
} from "@auaust/toolkit/forwardMethods";
export { forwardProperties } from "@auaust/toolkit/forwardProperties";
export { identity } from "@auaust/toolkit/identity";
export { isCallable } from "@auaust/toolkit/isCallable";
export { isContainer } from "@auaust/toolkit/isContainer";
export { isPlainObject } from "@auaust/toolkit/isPlainObject";
export { isPropertyKey } from "@auaust/toolkit/isPropertyKey";
export { isRegisteredSymbol } from "@auaust/toolkit/isRegisteredSymbol";
export { isSymbol } from "@auaust/toolkit/isSymbol";
export { keyMapper } from "@auaust/toolkit/keyMapper";
export { mapped } from "@auaust/toolkit/mapped";
export { mappedKeys } from "@auaust/toolkit/mappedKeys";
export { mappedValues } from "@auaust/toolkit/mappedValues";
export { match } from "@auaust/toolkit/match";
export { md5 } from "@auaust/toolkit/md5";
export { measure, type MeasureResult } from "@auaust/toolkit/measure";
export { measureAsync } from "@auaust/toolkit/measureAsync";
export { memberValue } from "@auaust/toolkit/memberValue";
export { memoized, type MemoizedFn } from "@auaust/toolkit/memoized";
export {
  methodForwarder,
  type AnyMethodForwarder,
  type MethodForwarder,
  type MethodForwardingInput,
  type MethodForwardingOptions,
} from "@auaust/toolkit/methodForwarder";
export {
  methodForwarders,
  type MethodForwarderFor,
} from "@auaust/toolkit/methodForwarders";
export { noop } from "@auaust/toolkit/noop";
export { now } from "@auaust/toolkit/now";
export { on } from "@auaust/toolkit/on";
export { once, type OnceFn } from "@auaust/toolkit/once";
export {
  pipe,
  type PipeCondition,
  type PipeEntry,
  type TransformFn,
} from "@auaust/toolkit/pipe";
export {
  pipeAsync,
  type AsyncPipeEntry,
  type AsyncTransformFn,
} from "@auaust/toolkit/pipeAsync";
export {
  propertyForwarder,
  type AnyPropertyForwarder,
  type PropertyForwarder,
  type PropertyForwardingInput,
  type PropertyForwardingOptions,
} from "@auaust/toolkit/propertyForwarder";
export {
  propertyForwarders,
  type PropertyForwarderFor,
} from "@auaust/toolkit/propertyForwarders";
export { readonly } from "@auaust/toolkit/readonly";
export { sleep } from "@auaust/toolkit/sleep";
export {
  spy,
  type SafeParameters,
  type SafeReturnType,
} from "@auaust/toolkit/spy";
export { stopwatch, type Stopwatch } from "@auaust/toolkit/stopwatch";
export { tap } from "@auaust/toolkit/tap";
export { throttle } from "@auaust/toolkit/throttle";
export { transform } from "@auaust/toolkit/transform";
export { transformKeys } from "@auaust/toolkit/transformKeys";
export { transformValues } from "@auaust/toolkit/transformValues";
export { value, type ResolvedValue, type Value } from "@auaust/toolkit/value";
export { when } from "@auaust/toolkit/when";

export * from "@auaust/toolkit/errors";
export * from "@auaust/toolkit/types";

const data = {
  name: __NAME__,
  version: __VERSION__,
  license: __LICENSE__,
  timestamp: __TIMESTAMP__,
};

export const BUILD: typeof data = Object.assign(Object.create(null), data);
