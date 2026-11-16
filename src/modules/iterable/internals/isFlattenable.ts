import { isContainer } from "#modules/guard/guards/isContainer";
import { isIterable } from "#modules/iterable/guards/isIterable";

export function isFlattenable(
  candidate: unknown,
): candidate is Iterable<unknown> & object {
  return isContainer(candidate) && isIterable(candidate);
}
