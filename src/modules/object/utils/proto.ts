export function proto<Prototype = any>(target: {}): Prototype | null;
export function proto<Prototype = any>(
  target: unknown,
): Prototype | null | undefined;
export function proto(target: unknown) {
  return target == null ? undefined : Object.getPrototypeOf(target);
}
