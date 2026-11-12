import { isContainer } from "#modules/guard/guards/isContainer";

export function ownKeys<Target extends {}>(target: Target): (keyof Target)[] {
  return isContainer(target)
    ? (Reflect.ownKeys(target) as (keyof Target)[])
    : [];
}
