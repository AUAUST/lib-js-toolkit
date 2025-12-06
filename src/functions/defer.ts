export type PromiseResolver<T = unknown> = (value: T | PromiseLike<T>) => void;

export type PromiseRejecter = (reason?: any) => void;

export type DeferPromise<T = unknown> = Promise<T> & {
  resolve: PromiseResolver<T>;
  reject: PromiseRejecter;
};

/**
 * @see https://lea.verou.me/blog/2016/12/resolve-promises-externally-with-this-one-weird-trick/
 */
export function defer<T>(): DeferPromise<T>;
export function defer(): DeferPromise {
  let res: PromiseResolver = undefined!;
  let rej: PromiseRejecter = undefined!;

  const promise = <DeferPromise>new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });

  promise.resolve = res;
  promise.reject = rej;

  return promise;
}
