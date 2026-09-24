import { implementsProtocol } from "@auaust/toolkit/protocols";
import { callable } from "@auaust/toolkit/protocols/callable";
import type { Callee, ResolvedCallable } from "@auaust/toolkit/types";

export function resolveCallable<T extends (...args: any[]) => any>(value: T): T;
export function resolveCallable<T extends Callee>(
  value: T,
): ResolvedCallable<T>;
export function resolveCallable(value: Callee): (...args: any[]) => any {
  if (implementsProtocol(callable, value)) {
    return value[callable].bind(value);
  }

  if (typeof value === "function") {
    return value;
  }

  throw new TypeError(`${String(value)} is not callable`);
}
