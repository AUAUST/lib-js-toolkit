export function spy<A extends any[], R, This>(
  closure: (this: This, ...args: A) => R,
  listenerBefore?: ((this: This, ...args: A) => void) | null,
  listenerAfter?: ((this: This, result: R, ...args: A) => void) | null
): (this: This, ...args: A) => R {
  return function (this: This, ...args: A): R {
    if (typeof listenerBefore === "function") {
      listenerBefore.apply(this, args);
    }

    const result = closure.apply(this, args);

    if (typeof listenerAfter === "function") {
      listenerAfter.call(this, result, ...args);
    }

    return result;
  };
}
