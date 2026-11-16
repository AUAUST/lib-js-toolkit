import { inspect } from "#modules/string/utils/inspect";

/**
 * Builds a default assertion message from its expectation, without the final
 * period, and the received value rendered by `inspect`.
 */
export function receivedMessage(
  expectation: string,
  received: unknown,
): string {
  return `${expectation}, received ${inspect(received)}.`;
}
