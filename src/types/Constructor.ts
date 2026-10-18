export type Constructor<
  Instance = any,
  Args extends readonly any[] = any[],
> = new (...args: Args) => Instance;
