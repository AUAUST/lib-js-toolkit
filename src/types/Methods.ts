import type { MethodName } from "@auaust/toolkit/types";

export type Methods<Target extends object> = Pick<Target, MethodName<Target>>;
