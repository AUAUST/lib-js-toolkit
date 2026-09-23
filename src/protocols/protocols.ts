import { isContainer } from "@auaust/toolkit/isContainer";
import type { ProtocolRegistry } from "@auaust/toolkit/protocols";

export type DefineProtocol<Marker extends symbol, Implementation> = {
  [Protocol in Marker]: Implementation;
};

export function implementsProtocol<Protocol extends keyof ProtocolRegistry>(
  protocol: Protocol,
  value: unknown,
): value is ProtocolRegistry[Protocol];
export function implementsProtocol(protocol: symbol, value: unknown): boolean;
export function implementsProtocol(protocol: symbol, value: unknown): boolean {
  return isContainer(value) && protocol in value;
}

export function protocolSymbol(name: string): symbol {
  return Symbol.for(`@auaust/toolkit/protocols/${name}`);
}
