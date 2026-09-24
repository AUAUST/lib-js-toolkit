import type { MethodName } from "@auaust/toolkit";

export type Methods<T extends object> = Pick<T, MethodName<T>>;
