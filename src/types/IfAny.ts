import type { IsAny } from "#types/IsAny";

export type IfAny<T, Any, NotAny = T> = IsAny<T, Any, NotAny>;
