import { assign, freeze } from "@auaust/toolkit/object";

export function finalize(target: any, ...sources: any[]) {
  return freeze(assign(target, ...sources));
}
