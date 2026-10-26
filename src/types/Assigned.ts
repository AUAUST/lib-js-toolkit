import type { Extended, IfAny } from "@auaust/toolkit/types";

type RequiredTargetKey<Target, Source> = {
  [Key in keyof Source]-?: Key extends keyof Target
    ? {} extends Pick<Target, Key>
      ? never
      : Key
    : never;
}[keyof Source];

type AssignedProperties<Target, Source extends object> = {
  -readonly [
    Key in keyof Source as Key extends RequiredTargetKey<Target, Source>
      ? never
      : Key
  ]: Source[Key];
} & {
  [Key in RequiredTargetKey<Target, Source>]: {} extends Pick<Source, Key>
    ? Source[Key] | Target[Key & keyof Target]
    : Source[Key];
};

type AssignedSource<Target, Source> = IfAny<
  Target | Source,
  any,
  Source extends null | undefined
    ? Target
    : Source extends object
      ? Extended<Target, AssignedProperties<Target, Source>>
      : Source extends string
        ? AssignedSource<Target, Record<number, string>>
        : Target
>;

type SourceKey<Source> = Source extends object ? keyof Source : never;

type SourceValue<Source, Key extends PropertyKey> = Source extends unknown
  ? Key extends keyof Source
    ? Source[Key]
    : never
  : never;

export type Assigned<
  Target,
  Sources extends readonly unknown[],
> = Sources extends readonly [infer Source, ...infer Rest]
  ? Assigned<AssignedSource<Target, Source>, Rest>
  : Sources extends readonly []
    ? Target
    : AssignedSource<
        Target,
        {
          [Key in SourceKey<Sources[number]>]?: SourceValue<
            Sources[number],
            Key
          >;
        }
      >;
