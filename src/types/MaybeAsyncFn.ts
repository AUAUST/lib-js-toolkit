import type { AsyncFn } from "@auaust/toolkit/types";

export type MaybeAsyncFn<
  Return = any,
  Arguments extends any[] = any[],
  This = any,
> = Return | AsyncFn<Return, Arguments, This>;
