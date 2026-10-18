import type { ToArrayKey } from "@auaust/toolkit/types";

export type PropertyValue<
  Target,
  Key extends PropertyKey,
  Fallback = any,
> = Target extends null | undefined
  ? undefined
  : Key extends keyof Target
    ? Target[Key]
    : ToArrayKey<Key> extends keyof Target
      ? Target[ToArrayKey<Key>]
      : Fallback;
