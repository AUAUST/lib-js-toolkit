export type InitializedProperty<
  Target,
  Key extends PropertyKey,
  Fallback,
> = Target extends unknown
  ? Key extends keyof Target
    ? {} extends Pick<Target, Key>
      ? Target[Key] | Fallback
      : Target[Key]
    : Fallback
  : never;
