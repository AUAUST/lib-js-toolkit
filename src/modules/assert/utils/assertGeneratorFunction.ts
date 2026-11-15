import { AssertionError } from "#errors/AssertionError";
import { isGeneratorFunction } from "#modules/function/guards/isGeneratorFunction";
import type { Fn } from "#types/Fn";

/**
 * @throws {AssertionError} unless the candidate is a generator function;
 * narrows it in place.
 */
export function assertGeneratorFunction(
  candidate: unknown,
  message = "Expected a generator function.",
): asserts candidate is Fn<Generator> {
  if (!isGeneratorFunction(candidate)) {
    throw new AssertionError(message);
  }
}
