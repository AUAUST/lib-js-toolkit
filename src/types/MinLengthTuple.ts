export type MinLengthTuple<
  Item,
  Length extends number,
  Accumulator extends Item[] = [],
> = number extends Length
  ? Item[]
  : Accumulator["length"] extends Length
    ? [...Accumulator, ...Item[]]
    : MinLengthTuple<Item, Length, [...Accumulator, Item]>;
