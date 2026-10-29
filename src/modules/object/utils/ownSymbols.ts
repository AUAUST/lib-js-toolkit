import { isContainer } from "#utils/isContainer";

export function ownSymbols<Target extends {}>(
  target: Target,
): (keyof Target & symbol)[] {
  return isContainer(target)
    ? (Object.getOwnPropertySymbols(target) as (keyof Target & symbol)[])
    : [];
}
