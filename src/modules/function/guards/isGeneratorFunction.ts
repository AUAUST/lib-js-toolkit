import type { Fn } from "#types/Fn";

export function isGeneratorFunction(
  candidate: unknown,
): candidate is Fn<Generator> {
  return (
    Object.prototype.toString.call(candidate) === "[object GeneratorFunction]"
  );
}
