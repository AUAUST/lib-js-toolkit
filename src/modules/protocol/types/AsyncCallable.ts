import type { Callable } from "#modules/protocol/types/Callable";

export type AsyncCallable<
  Return = any,
  Arguments extends readonly any[] = any[],
  This = any,
> = Callable<Promise<Return>, Arguments, This>;
