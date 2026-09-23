import { type DefineProtocol, protocolSymbol } from "@auaust/toolkit/protocols";

declare module "@auaust/toolkit/protocols" {
  interface ProtocolRegistry extends DefineProtocol<
    typeof isEmpty,
    Emptiable
  > {}
}

export interface Emptiable<IsEmpty extends boolean = boolean> {
  [isEmpty]: IsEmpty | (() => IsEmpty);
}

export const isEmpty: unique symbol = protocolSymbol(
  "emptiable",
) as typeof isEmpty;
