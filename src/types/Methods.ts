import type { MethodName } from "@auaust/toolkit/types";

export type Methods<T extends object> = Pick<T, MethodName<T>>;
