import { isContainer } from "@auaust/toolkit/isContainer";

export function ownKeys<Target extends {}>(target: Target): (keyof Target)[] {
  return isContainer(target)
    ? (Reflect.ownKeys(target) as (keyof Target)[])
    : [];
}
