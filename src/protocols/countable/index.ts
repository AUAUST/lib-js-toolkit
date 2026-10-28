import type { DefineProtocol } from "@auaust/toolkit/protocols";

declare module "@auaust/toolkit/protocols" {
  interface ProtocolRegistry extends DefineProtocol<
    typeof countOf,
    Countable
  > {}
}

export interface Countable {
  [countOf](): number;
}

export interface EmptyCountable {
  [countOf](): 0;
}

export const countOf: unique symbol = Symbol.for("Protocol.countable");
