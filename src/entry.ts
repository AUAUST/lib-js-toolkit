import { frozen } from "#modules/general/utils/frozen";

export const BUILD = frozen({
  name: __NAME__,
  version: __VERSION__,
  license: __LICENSE__,
});

// @barrel domains
export * from "#errors";
export * as array from "#modules/array/entry";
export * as assert from "#modules/assert/entry";
export * as async from "#modules/async/entry";
export * as boolean from "#modules/boolean/entry";
export * as composer from "#modules/composer/entry";
export * as forwarder from "#modules/forwarder/entry";
export * as function from "#modules/function/entry";
export * from "#modules/general/entry";
export * from "#modules/guard/entry";
export * as guard from "#modules/guard/entry";
export * as iterable from "#modules/iterable/entry";
export * as maplike from "#modules/maplike/entry";
export * as math from "#modules/math/entry";
export * as number from "#modules/number/entry";
export * as object from "#modules/object/entry";
export * as parse from "#modules/parse/entry";
export * as protocol from "#modules/protocol/entry";
export * as setlike from "#modules/setlike/entry";
export * as string from "#modules/string/entry";
export type * from "#types";
// @end
