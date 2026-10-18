import type { MaybePromise } from "@auaust/toolkit/types";

export type AsyncFn<
  Return = any,
  Arguments extends readonly any[] = any[],
  This = unknown,
> = (this: This, ...args: Arguments) => MaybePromise<Return>;
