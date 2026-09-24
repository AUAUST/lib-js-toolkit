import { type DefineProtocol, protocolSymbol } from "@auaust/toolkit/protocols";

declare module "@auaust/toolkit/protocols" {
  interface ProtocolRegistry extends DefineProtocol<
    typeof callable,
    Callable
  > {}
}

export interface Callable<
  Arguments extends readonly any[] = any,
  Result = any,
  This = any,
> {
  [callable](this: this, ...args: Arguments): Result;
  [callable](this: This, ...args: Arguments): Result;
}

export type CallableParameters<T extends Callable<any, any>> =
  T extends Callable<infer Arguments, any> ? Readonly<Arguments> : never;

export type CallableReturnType<T extends Callable<any, any>> =
  T extends Callable<any, infer Result> ? Result : never;

export const callable: unique symbol = protocolSymbol(
  "callable",
) as typeof callable;
