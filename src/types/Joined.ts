type JoinedItem<Item> = Item extends null | undefined
  ? ""
  : Item extends boolean
    ? `${Item}`
    : Item extends string | number
      ? string extends Item
        ? string
        : number extends Item
          ? string
          : `${Item}`
      : string;

/**
 * The string a tuple of literals joins into with a literal separator, as
 * `Array.prototype.join`; any wide part widens the result to `string`.
 */
export type Joined<
  Items extends readonly unknown[],
  Separator extends string,
> = string extends Separator
  ? string
  : Items extends readonly []
    ? ""
    : Items extends readonly [infer Item]
      ? JoinedItem<Item>
      : Items extends readonly [infer Item, ...infer Rest]
        ? JoinedItem<Item> extends infer Head extends string
          ? Joined<Rest, Separator> extends infer Tail extends string
            ? string extends Head | Tail
              ? string
              : `${Head}${Separator}${Tail}`
            : never
          : never
        : string;
