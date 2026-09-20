export type Methods<T extends object> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : never;
};
