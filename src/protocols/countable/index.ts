import { type DefineProtocol, protocolSymbol } from "@auaust/toolkit/protocols";

declare module "@auaust/toolkit/protocols" {
  interface ProtocolRegistry extends DefineProtocol<
    typeof countOf,
    Countable
  > {}
}

export interface Countable {
  [countOf](): number;
}

export const countOf: unique symbol = protocolSymbol(
  "countable",
) as typeof countOf;
