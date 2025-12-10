export type SafeReturnType<F> = F extends (...args: any[]) => infer R
  ? R
  : undefined;

export type SafeParameters<F> = F extends (...args: infer P) => any ? P : [];

export function spy<F extends (this: This, ...args: any[]) => any, This>(
  fn: F,
  before?: ((this: This, ...args: Parameters<F>) => void) | null,
  after?:
    | ((this: This, result: ReturnType<F>, ...args: Parameters<F>) => void)
    | null
): (this: This, ...args: Parameters<F>) => ReturnType<F>;
export function spy<
  F extends ((...args: any[]) => any) | null | undefined,
  This
>(
  fn: F,
  before?: ((this: This, ...args: SafeParameters<F>) => void) | null,
  after?:
    | ((
        this: This,
        result: SafeReturnType<F>,
        ...args: SafeParameters<F>
      ) => void)
    | null
): (this: This, ...args: SafeParameters<F>) => SafeReturnType<F>;
export function spy(
  this: any,
  fn: any,
  before?: any,
  after?: any
): (...args: any[]) => any {
  return function (this: any, ...args: any[]): any {
    if (typeof before === "function") {
      before.apply(this, args);
    }

    const result = typeof fn === "function" ? fn.apply(this, args) : undefined;

    if (typeof after === "function") {
      after.call(this, result, ...args);
    }

    return result;
  };
}
