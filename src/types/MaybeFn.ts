import type { Fn } from "#types/Fn";

export type MaybeFn<
  Return = any,
  Arguments extends readonly any[] = any[],
  This = any,
> = Return | Fn<Return, Arguments, This>;
