import { isFunction } from "#modules/function/guards/isFunction";
import type { Constructor } from "#types/Constructor";

const constructTrap: ProxyHandler<(...args: unknown[]) => unknown> = {
  construct() {
    return constructTrap;
  },
};

/**
 * Tests whether `new` accepts the candidate, without running it.
 */
export function isConstructible(candidate: unknown): candidate is Constructor {
  if (!isFunction(candidate)) {
    return false;
  }

  try {
    Reflect.construct(new Proxy(candidate, constructTrap), []);

    return true;
  } catch {
    return false;
  }
}
