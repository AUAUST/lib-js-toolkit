import type { Callable } from "#modules/protocol/types/Callable";
import type { MaybePromise } from "#types/MaybePromise";

export type AsyncCallable<
  Return = any,
  Arguments extends readonly any[] = any[],
  This = any,
> = Callable<MaybePromise<Return>, Arguments, This>;
