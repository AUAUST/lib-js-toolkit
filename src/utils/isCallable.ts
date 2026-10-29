import { callable } from "#modules/protocol/symbols";
import { implementsProtocol } from "#modules/protocol/utils/implementsProtocol";
import { isContainer } from "#utils/isContainer";
import type { Callee } from "#types/Callee";
import type { MethodName } from "#types/MethodName";

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
