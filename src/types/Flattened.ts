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

/**
 * The object `flatten` returns for a string separator: the leaves of nested
 * object types at the root, keyed by their joined path.
 */
export type Flattened<Target, Separator extends string> = IfNever<
  keyof Target,
  {},
  Simplify<UnionToIntersection<FlattenedEntries<Target, Separator, "">>>
>;
