import type { MethodName } from "#types/MethodName";

export type Methods<Target extends object> = Pick<Target, MethodName<Target>>;
