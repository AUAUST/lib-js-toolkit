export type PromiseResolver<Result = unknown> = (
  value: Result | PromiseLike<Result>,
) => void;

export type PromiseRejecter = (reason?: any) => void;

export type DeferPromise<Result = unknown> = Promise<Result> & {
  resolve: PromiseResolver<Result>;
  reject: PromiseRejecter;
};

/**
 * @see https://lea.verou.me/blog/2016/12/resolve-promises-externally-with-this-one-weird-trick/
 */
export function defer<Result>(): DeferPromise<Result>;
export function defer(): DeferPromise {
  let res!: PromiseResolver;
  let rej!: PromiseRejecter;

  const promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  }) as DeferPromise;

  promise.resolve = res;
  promise.reject = rej;

  return promise;
}
