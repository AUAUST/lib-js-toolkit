import type { AsyncFn } from "@auaust/toolkit/types";

export type MaybeAsyncFn<
  Return = any,
  Arguments extends readonly any[] = any[],
  This = any,
> = Return | AsyncFn<Return, Arguments, This>;
