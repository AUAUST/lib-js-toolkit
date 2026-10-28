import { isContainer } from "@auaust/toolkit/isContainer";
import { implementsProtocol } from "@auaust/toolkit/protocols";
import { callable } from "@auaust/toolkit/protocols/callable";
import type { Callee, MethodName } from "@auaust/toolkit/types";

export function isCallable(value: unknown): value is Callee;
export function isCallable<Target extends object>(
  value: Target,
  method: MethodName<Target>,
): boolean;
export function isCallable<Method extends PropertyKey>(
  value: unknown,
  method: Method,
): value is {
  [key in Method]: Callee;
};
export function isCallable(value: unknown, method?: PropertyKey): boolean {
  if (method !== undefined) {
    return isContainer(value) && isCallable((value as any)[method]);
  }

  return typeof value === "function" || implementsProtocol(callable, value);
}
