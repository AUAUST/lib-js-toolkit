export type MethodNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

export type ForwardCalls<
  T extends object,
  H extends object,
  M extends MethodNames<H>
> = T & {
  [K in M]: K extends keyof T ? never : H[K];
};

/**
 * Exposes the `methods` from the `handler` through the `interface`.
 */
export function forwardCalls<
  T extends object,
  H extends object,
  M extends MethodNames<H>
>(target: T, handler: H, methods: M | M[]): ForwardCalls<T, H, M>;
export function forwardCalls(
  target: any,
  handler: any,
  methods: string | string[]
): any {
  if (typeof methods === "string") {
    methods = [methods];
  }

  for (const method of methods) {
    if (target.hasOwnProperty(method)) {
      throw new Error(
        `Target object already has a property named ${String(
          method
        )}. Cannot forward call.`
      );
    }

    if (typeof handler[method] !== "function") {
      throw new Error(
        `Method ${method} does not exist on the provided interface.`
      );
    }

    target[method] = function (...args: any[]) {
      return handler[method].apply(handler, args);
    };
  }

  return target;
}
