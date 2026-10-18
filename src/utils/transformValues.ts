import { call } from "@auaust/toolkit/call";
import type { Callee, CallReturnType } from "@auaust/toolkit/types";

export function transformValues<Target extends object>(target: Target): Target;
export function transformValues<
  Target extends object,
  Transformer extends Callee<
    any,
    [
      value: Target[keyof Target],
      key: keyof Target,
      /** @internal */
      sourceKey: keyof Target,
    ]
  >,
>(
  target: Target,
  transformer: Transformer,
): {
  [Key in keyof Target]: CallReturnType<Transformer>;
};
export function transformValues(
  target: Record<string, any>,
  transformer?: Callee<any, [value: any, key: PropertyKey, sourceKey: string]>,
): Record<string, any>;
export function transformValues(
  target: any,
  transformer: Callee = (value) => value,
) {
  for (const key in target) {
    target[key] = call(transformer, target[key], key, key);
  }

  return target;
}
