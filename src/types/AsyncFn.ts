import type { MaybePromise } from "@auaust/toolkit/types";

export type AsyncFn<
  Return = any,
  Arguments extends readonly any[] = any[],
  This = any,
> = (this: This, ...args: Arguments) => MaybePromise<Return>;
