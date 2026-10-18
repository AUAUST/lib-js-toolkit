import type { Fn } from "@auaust/toolkit/types";

export type MaybeFn<
  Return = any,
  Arguments extends readonly any[] = any[],
  This = any,
> = Return | Fn<Return, Arguments, This>;
