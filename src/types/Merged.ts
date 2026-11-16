import type { Assigned } from "#types/Assigned";
import type { Extended } from "#types/Extended";
import type { IfAny } from "#types/IfAny";

type IsMergeable<Value> = [Value] extends [object]
  ? [Value] extends [readonly unknown[]]
    ? false
    : [Value] extends [Function]
      ? false
      : true
  : false;

type MergedValue<Target, Source> = IsMergeable<Target> extends true
  ? IsMergeable<Source> extends true
    ? Merged<Target, [Source]>
    : Target
  : IsMergeable<Source> extends true
    ? Target
    : Source;

type MergedKey<Target, Source> = {
  [Key in keyof Source & keyof Target]-?: IsMergeable<Target[Key]> extends true
    ? Key
    : IsMergeable<Source[Key]> extends true
      ? Key
      : never;
}[keyof Source & keyof Target];

type MergedSource<Target, Source> = IfAny<
  Target | Source,
  any,
  Source extends object
    ? Extended<
        Assigned<Target, [Source]>,
        {
          [Key in MergedKey<Target, Source>]: MergedValue<
            Target[Key],
            Source[Key]
          >;
        }
      >
    : Target
>;

/**
 * `Target` once `merge` merged `Sources` into it: `Assigned`, except keys both
 * sides hold as plain object types recurse, and keys whose sides disagree on
 * being mergeable keep the target's type.
 */
export type Merged<
  Target,
  Sources extends readonly unknown[],
> = Sources extends readonly [infer Source, ...infer Rest]
  ? Merged<MergedSource<Target, Source>, Rest>
  : Sources extends readonly []
    ? Target
    : Assigned<Target, Sources>;
