import { implementsProtocol } from "@auaust/toolkit/protocols";
import { callable } from "@auaust/toolkit/protocols/callable";
import type { Callee, ResolvedCallable } from "@auaust/toolkit/types";

export function resolveCallable<T extends (...args: any[]) => any>(value: T): T;
export function resolveCallable<T extends Callee>(
  value: T,
): ResolvedCallable<T>;
export function resolveCallable<Arguments extends any[], Result, This>(
  value: Callee<Arguments, Result, This>,
  thisArg: This,
): (...args: Arguments) => Result;
export function resolveCallable(
  value: Callee,
  thisArg?: any,
): (...args: any[]) => any {
  if (implementsProtocol(callable, value)) {
    return value[callable].bind(thisArg === undefined ? value : thisArg);
  }

  if (typeof value === "function") {
    return thisArg === undefined ? value : value.bind(thisArg);
  }

  throw new TypeError(`${String(value)} is not callable`);
}
