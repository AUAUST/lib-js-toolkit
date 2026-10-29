import { resolveCallable } from "#utils/resolveCallable";
import type { Callee } from "#types/Callee";
import type { CallReturnType } from "#types/CallReturnType";

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
  transform: Callee = (value) => value,
) {
  if (!transform) {
    return target;
  }

  const transformer = resolveCallable(transform);

  for (const key in target) {
    target[key] = transformer(target[key], key, key);
  }

  return target;
}
