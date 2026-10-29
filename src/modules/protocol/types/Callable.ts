import type { callable } from "#modules/protocol/symbols";

export interface Callable<
  Return = any,
  Arguments extends readonly any[] = any[],
  This = any,
> {
  [callable](this: This, ...args: Arguments): Return;
}
