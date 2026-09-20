export type Methods<T extends object> = {
  [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K];
};
