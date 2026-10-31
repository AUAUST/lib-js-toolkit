import { isContainer } from "#modules/guard/utils/isContainer";
import { callable } from "#modules/protocol/symbols";
import { implementsProtocol } from "#modules/protocol/utils/implementsProtocol";
import type { Callee } from "#types/Callee";
import type { MethodName } from "#types/MethodName";

export function isCallable(candidate: unknown): candidate is Callee;
export function isCallable<Target extends object>(
  candidate: Target,
  method: MethodName<Target>,
): boolean;
export function isCallable<Method extends PropertyKey>(
  candidate: unknown,
  method: Method,
): candidate is {
  [key in Method]: Callee;
};
export function isCallable(candidate: unknown, method?: PropertyKey): boolean {
  if (method !== undefined) {
    return isContainer(candidate) && isCallable((candidate as any)[method]);
  }

  return (
    typeof candidate === "function" || implementsProtocol(callable, candidate)
  );
}
