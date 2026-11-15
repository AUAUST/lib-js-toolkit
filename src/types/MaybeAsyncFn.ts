import type { Fn } from "#types/Fn";
import type { MaybePromise } from "#types/MaybePromise";

export type MaybeAsyncFn<
  Return = any,
  Arguments extends readonly any[] = any[],
  This = any,
> = Fn<MaybePromise<Return>, Arguments, This>;
