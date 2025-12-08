export function debounce<T, F extends (this: T, ...args: any[]) => any>(
  fn: F,
  ms: number
): (this: T, ...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (this: T, ...args: Parameters<F>): void {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn.call(this, ...args);
      timeoutId = undefined;
    }, ms);
  };
}
