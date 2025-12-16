export class PipelineError<T = unknown> extends Error {
  public readonly name = "PipelineError";

  /** The function that caused the error in the pipeline. */
  public readonly fn: Function;

  /** The index of the function in the pipeline where the error occurred. */
  public readonly step: number;

  /** The value of `this`` when the error occurred. */
  public readonly thisValue: unknown;

  /** The input that was provided to the function that caused the error. */
  public readonly input: T;

  constructor({
    fn,
    step,
    input,
    thisValue,
    cause,
  }: {
    fn: Function;
    step: number;
    input: T;
    thisValue: unknown;
    cause: unknown;
  }) {
    const message = cause instanceof Error ? cause.message : String(cause);

    super(`Pipeline step failed: ${message}`, { cause });

    this.fn = fn;
    this.step = step;
    this.input = input;
    this.cause = cause;
    this.thisValue = thisValue;

    if (cause instanceof Error) {
      this.stack = cause.stack;
    }
  }
}
