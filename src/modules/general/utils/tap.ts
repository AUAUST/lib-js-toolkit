import { callWith } from "#modules/function/utils/callWith";
import type { Callee } from "#types/Callee";

export function tap<V, This = any>(
  this: This,
  value: V,
  callback: Callee<void, [value: V], This>,
): V {
  callWith(callback, this, value);

  return value;
}
