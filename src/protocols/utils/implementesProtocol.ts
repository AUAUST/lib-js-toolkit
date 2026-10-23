import { isContainer } from "@auaust/toolkit/isContainer";
import type { ProtocolRegistry } from "@auaust/toolkit/protocols";

export function implementsProtocol<Protocol extends keyof ProtocolRegistry>(
  protocol: Protocol,
  value: unknown,
): value is ProtocolRegistry[Protocol];
export function implementsProtocol(protocol: symbol, value: unknown): boolean;
export function implementsProtocol(protocol: symbol, value: unknown): boolean {
  return isContainer(value) && protocol in value;
}
