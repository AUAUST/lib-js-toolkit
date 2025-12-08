export function after<R, A extends any[], This>(
  this: This,
  callback: (this: This, ...args: A) => R,
  ms: number,
  ...args: NoInfer<A>
): Promise<R> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(callback.apply(this, args)), ms)
  );
}
