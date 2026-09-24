import type { IsAny } from "@auaust/toolkit/types";

export type IfAny<T, Any, NotAny = T> = IsAny<T, Any, NotAny>;
