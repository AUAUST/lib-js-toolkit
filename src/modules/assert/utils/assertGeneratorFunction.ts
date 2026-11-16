import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isGeneratorFunction } from "#modules/function/guards/isGeneratorFunction";
import type { Fn } from "#types/Fn";

/**
 * @throws {AssertionError} unless the candidate is a generator function;
 * narrows it in place.
 */
export function assertGeneratorFunction(
  candidate: unknown,
  message?: string,
): asserts candidate is Fn<Generator> {
  if (!isGeneratorFunction(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected a generator function", candidate),
    );
  }
}
