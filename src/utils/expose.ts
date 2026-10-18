import { isObject } from "@auaust/toolkit/isObject";
import { entries, finalize } from "@auaust/toolkit/object";

let defaultTarget: Record<PropertyKey, any> | undefined;

export interface Expose extends Function {
  <Pairs extends Record<PropertyKey, any>>(
    pairs: Pairs,
    when?: boolean,
    target?: Record<PropertyKey, any>,
  ): Pairs;
  <Value>(
    name: PropertyKey,
    value: Value,
    when?: boolean,
    target?: Record<PropertyKey, any>,
  ): Value;

  target(target: Record<PropertyKey, any>): void;
}

function doExpose<Pairs extends Record<PropertyKey, any>>(
  pairs: Pairs,
  when?: boolean,
  target?: Record<PropertyKey, any>,
): Pairs;
function doExpose<Value>(
  name: PropertyKey,
  value: Value,
  when?: boolean,
  target?: Record<PropertyKey, any>,
): Value;
function doExpose(
  nameOrRecord: PropertyKey | Record<PropertyKey, any>,
  valueOrWhen: unknown,
  whenOrTarget?: boolean | Record<PropertyKey, any>,
  target?: any,
): unknown {
  if (isObject(nameOrRecord)) {
    for (const [k, v] of entries(nameOrRecord)) {
      doExpose(
        k,
        v,
        valueOrWhen as boolean,
        isObject(whenOrTarget) ? whenOrTarget : undefined,
      );
    }

    return nameOrRecord;
  }

  if (whenOrTarget ?? true) {
    const receiver = target ?? defaultTarget ?? globalThis;

    receiver[nameOrRecord] = valueOrWhen;
  }

  return valueOrWhen;
}

export const expose: Expose = finalize(doExpose, {
  target(target: Record<PropertyKey, any>) {
    defaultTarget = target;
  },
});
