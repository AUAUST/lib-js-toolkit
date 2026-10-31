import { isContainer } from "#modules/guard/utils/isContainer";

export function ownNames<Target extends {}>(
  target: Target,
): (keyof Target & string)[] {
  return isContainer(target)
    ? (Object.getOwnPropertyNames(target) as (keyof Target & string)[])
    : [];
}
