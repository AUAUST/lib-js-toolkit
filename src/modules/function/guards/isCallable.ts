import { isFunction } from "#modules/function/guards/isFunction";
import { callable } from "#modules/protocol/symbols";
import { implementsProtocol } from "#modules/protocol/utils/implementsProtocol";
import type { Callee } from "#types/Callee";

export function isCallable(candidate: unknown): candidate is Callee {
  return isFunction(candidate) || implementsProtocol(callable, candidate);
}
