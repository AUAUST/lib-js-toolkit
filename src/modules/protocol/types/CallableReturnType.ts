import type { Callable } from "#modules/protocol/types/Callable";

export type CallableReturnType<T extends Callable> =
  T extends Callable<infer Return, any> ? Return : never;
