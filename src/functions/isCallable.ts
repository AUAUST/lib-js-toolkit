import { implementsProtocol } from "@auaust/toolkit/protocols";
import { callable } from "@auaust/toolkit/protocols/callable";
import type { Callee } from "@auaust/toolkit/types";

export function isCallable(value: unknown): value is Callee {
  return typeof value === "function" || implementsProtocol(callable, value);
}
