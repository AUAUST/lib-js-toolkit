import { call } from "#utils/call";
import type { Callee } from "#types/Callee";

export function tap<V, This = any>(
  this: This,
  value: V,
  callback: Callee<void, [value: V], This>,
): V {
  call.call(this, callback, value);

  return value;
}
