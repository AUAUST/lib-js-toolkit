/**
 * Returns `function instantiated`, telling whether its candidate is an instance
 * of `constructor`, as `instanceof` does.
 */
export function instanceOf<
  Constructor extends abstract new (...args: any[]) => unknown,
>(
  constructor: Constructor,
): (candidate: unknown) => candidate is InstanceType<Constructor> {
  return function instantiated(
    candidate: unknown,
  ): candidate is InstanceType<Constructor> {
    return candidate instanceof constructor;
  };
}
