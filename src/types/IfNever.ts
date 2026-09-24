import type { IsNever } from "@auaust/toolkit/types";

export type IfNever<T, Never, NotNever = T> = IsNever<T, Never, NotNever>;
