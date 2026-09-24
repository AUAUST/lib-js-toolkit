import type { IsUnknown } from "@auaust/toolkit/types";

export type IfUnknown<T, Unknown, NotUnknown = T> = IsUnknown<
  T,
  Unknown,
  NotUnknown
>;
