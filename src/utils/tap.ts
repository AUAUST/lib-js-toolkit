import { call } from "@auaust/toolkit/call";
import type { Callee } from "@auaust/toolkit/types";

export function tap<V, This = any>(
  this: This,
  value: V,
  callback: Callee<void, [value: V], This>,
): V {
  call.call(this, callback, value);

  return value;
}
