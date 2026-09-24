export type MethodName<T extends object> = {
  [K in keyof T]: ((...args: any[]) => any) extends T[K] ? K : never;
}[keyof T];
