import type { DefineProtocol } from "@auaust/toolkit/protocols";
import type { MaybePromise } from "@auaust/toolkit/types";

declare module "@auaust/toolkit/protocols" {
  interface ProtocolRegistry extends DefineProtocol<
    typeof callable,
    Callable
  > {}
}

export interface Callable<
  Return = any,
  Arguments extends readonly any[] = any[],
  This = any,
> {
  [callable](this: This, ...args: Arguments): Return;
}

export type AsyncCallable<
  Return = any,
  Arguments extends readonly any[] = any[],
  This = any,
> = Callable<MaybePromise<Return>, Arguments, This>;

export type CallableParameters<T extends Callable> =
  T extends Callable<any, infer Arguments> ? Readonly<Arguments> : never;

export type CallableReturnType<T extends Callable> =
  T extends Callable<infer Return, any> ? Return : never;

export const callable: unique symbol = Symbol.for("Protocol.callable");
