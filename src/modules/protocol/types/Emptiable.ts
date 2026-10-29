import type { emptiable } from "#modules/protocol/symbols";

export interface Emptiable<IsEmpty extends boolean = boolean> {
  [emptiable]: IsEmpty | (() => IsEmpty);
}
