import type { Callable } from "#modules/protocol/types/Callable";

export type CallableParameters<T extends Callable> =
  T extends Callable<any, infer Arguments> ? Readonly<Arguments> : never;
