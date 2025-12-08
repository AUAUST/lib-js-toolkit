export function spy<A extends any[], R, This>(
  fn: (this: This, ...args: A) => R,
  before?: ((this: This, ...args: A) => void) | null,
  after?: ((this: This, result: R, ...args: A) => void) | null
): (this: This, ...args: A) => R {
  return function (this: This, ...args: A): R {
    if (typeof before === "function") {
      before.apply(this, args);
    }

    const result = fn.apply(this, args);

    if (typeof after === "function") {
      after.call(this, result, ...args);
    }

    return result;
  };
}
