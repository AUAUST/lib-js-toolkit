import type { IfNever } from "#types/IfNever";
import type { Simplify } from "#types/Simplify";
import type { UnionToIntersection } from "#types/UnionToIntersection";

type FlattenedEntries<
  Target,
  Separator extends string,
  Prefix extends string,
> = PropertyKey extends keyof Target
  ? Record<string, unknown>
  : {
      [Key in keyof Target & (string | number)]: Target[Key] extends Record<
        string,
        unknown
      >
        ? FlattenedEntries<
            Target[Key],
            Separator,
            `${Prefix}${Key}${Separator}`
          >
        : { [Path in `${Prefix}${Key}`]: Target[Key] };
    }[keyof Target & (string | number)];

export type Flattened<Target, Separator extends string> = IfNever<
  keyof Target,
  {},
  Simplify<UnionToIntersection<FlattenedEntries<Target, Separator, "">>>
>;
