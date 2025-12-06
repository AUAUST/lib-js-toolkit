export function after<R, A extends any[]>(
  closure: (...args: A) => R,
  ms: number,
  ...args: NoInfer<A>
): Promise<R> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(closure(...args)), ms)
  );
}
