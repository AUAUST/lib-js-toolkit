import type { IsUnknown } from "#types/IsUnknown";

export type IfUnknown<T, Unknown, NotUnknown = T> = IsUnknown<
  T,
  Unknown,
  NotUnknown
>;
