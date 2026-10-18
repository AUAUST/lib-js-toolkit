import { type DefineProtocol } from "@auaust/toolkit/protocols";

declare module "@auaust/toolkit/protocols" {
  interface ProtocolRegistry extends DefineProtocol<
    typeof callable,
    Callable
  > {}
}

export interface Callable<
  Arguments extends readonly any[] = any,
  Return = any,
  This = any,
> {
  [callable](this: This, ...args: Arguments): Return;
}

export type CallableParameters<T extends Callable> =
  T extends Callable<infer Arguments, any> ? Readonly<Arguments> : never;

export type CallableReturnType<T extends Callable> =
  T extends Callable<any, infer Return> ? Return : never;

export const callable: unique symbol = Symbol.for("Protocol.callable");
