import type { countable } from "#modules/protocol/symbols";

export interface EmptyCountable {
  [countable](): 0;
}
