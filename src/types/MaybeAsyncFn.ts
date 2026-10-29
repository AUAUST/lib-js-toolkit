import type { AsyncFn } from "#types/AsyncFn";

export type MaybeAsyncFn<
  Return = any,
  Arguments extends readonly any[] = any[],
  This = any,
> = Return | AsyncFn<Return, Arguments, This>;
