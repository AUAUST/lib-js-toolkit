/**
 * Thrown when a code path the program assumes impossible executes. It signals a
 * bug, never an expected failure.
 */
export class UnreachableError extends Error {
  public readonly name: string = "UnreachableError";

  public constructor(
    message = "Reached a code path assumed unreachable.",
    options?: ErrorOptions,
  ) {
    super(message, options);
  }
}
