export function after<Result, Arguments extends any[], This>(
  this: This,
  callback: (this: This, ...args: Arguments) => Result,
  delay: number,
  ...args: Arguments
): Promise<Result> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(callback.apply(this, args)), delay),
  );
}
