import type { Fn } from "#types/Fn";

/**
 * Reads the `Object.prototype.toString` tag, so functions from other realms match
 * and functions merely returning the same result do not.
 */
export function isGeneratorFunction(
  candidate: unknown,
): candidate is Fn<Generator> {
  return (
    Object.prototype.toString.call(candidate) === "[object GeneratorFunction]"
  );
}
