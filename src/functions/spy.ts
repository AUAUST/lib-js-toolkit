export type SpyOptions = {
  before?: boolean;
  after?: boolean;
};

export function spy<A extends any[], R>(
  closure: (...args: A) => R,
  listener: (this: R | undefined, ...args: A) => void,
  options?: SpyOptions
): (...args: A) => R {
  const before = options?.before ?? (options?.after ?? false) === false;
  const after = options?.after ?? !before;

  return (...args: A): R => {
    if (before) {
      listener.call(undefined, ...args);
    }

    const result = closure(...args);

    if (after) {
      listener.call(result, ...args);
    }

    return result;
  };
}
