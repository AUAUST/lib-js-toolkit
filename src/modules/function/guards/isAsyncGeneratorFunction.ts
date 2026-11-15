import type { Fn } from "#types/Fn";

export function isAsyncGeneratorFunction(
  candidate: unknown,
): candidate is Fn<AsyncGenerator> {
  return (
    Object.prototype.toString.call(candidate) ===
    "[object AsyncGeneratorFunction]"
  );
}
