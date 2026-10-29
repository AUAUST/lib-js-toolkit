import type { IsNever } from "#types/IsNever";

export type IfNever<T, Never, NotNever = T> = IsNever<T, Never, NotNever>;
