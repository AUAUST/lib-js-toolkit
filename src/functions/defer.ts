export type PromiseResolver<Result = unknown> = (
  value: Result | PromiseLike<Result>,
) => void;

export type PromiseRejecter = (reason?: any) => void;

export interface DeferPromise<Result = unknown> extends Promise<Result> {
  resolve: PromiseResolver<Result>;
  reject: PromiseRejecter;
}

export function defer<Result>(): DeferPromise<Result> {
  let resolve!: PromiseResolver<Result>;
  let reject!: PromiseRejecter;

  const promise = new Promise<Result>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return Object.assign(promise, {
    resolve,
    reject,
  });
}
