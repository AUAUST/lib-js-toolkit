type PipeFunction = (value: any) => any;

type PipeEntry =
  | PipeFunction
  | [when: boolean | ((value: any) => boolean), then: PipeFunction];

export function pipe<T>(this: T, ...fns: PipeEntry[]) {
  return function (this: T, initialValue: unknown) {
    return fns.reduce((carry, entry) => {
      let fn: PipeFunction;

      if (Array.isArray(entry)) {
        const [condition, func] = entry;

        if (
          typeof condition === "function"
            ? condition.call(this, carry)
            : condition
        ) {
          fn = func;
        } else {
          return carry;
        }
      } else {
        fn = entry;
      }

      return fn.call(this, carry);
    }, initialValue);
  };
}
