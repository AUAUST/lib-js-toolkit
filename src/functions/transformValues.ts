export function transformValues<Target extends object>(target: Target): Target;
export function transformValues<
  Target extends object,
  Transformer extends (
    value: Target[keyof Target],
    key: keyof Target,
    /** @internal */
    sourceKey: keyof Target,
  ) => any,
>(
  target: Target,
  transformer: Transformer,
): {
  [Key in keyof Target]: ReturnType<Transformer>;
};
export function transformValues(
  target: Record<string, any>,
  transformer?: (value: any, key: PropertyKey, sourceKey: string) => any,
): Record<string, any>;
export function transformValues(
  target: any,
  transformer: (...args: any[]) => any = (value) => value,
) {
  for (const key in target) {
    target[key] = transformer(target[key], key, key);
  }

  return target;
}
