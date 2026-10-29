import type { countable } from "#modules/protocol/symbols";

export interface Countable {
  [countable](): number;
}
