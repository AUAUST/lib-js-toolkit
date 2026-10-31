import { isArray } from "#modules/array/utils/isArray";
import { getterComposer } from "#modules/composer/utils/getterComposer";
import { getterComposers } from "#modules/composer/utils/getterComposers";
import { isPropertyComposer } from "#modules/composer/utils/isPropertyComposer";
import {
  propertyComposer,
  type PropertyComposer,
} from "#modules/composer/utils/propertyComposer";
import { propertyComposers } from "#modules/composer/utils/propertyComposers";
import { valueComposer } from "#modules/composer/utils/valueComposer";
import { valueComposers } from "#modules/composer/utils/valueComposers";
import { create } from "#modules/object/utils/create";
import { defineProperty } from "#modules/object/utils/defineProperty";
import { finalize } from "#modules/object/utils/finalize";
import type { DefinedProperties } from "#types/DefinedProperties";
import type { Extended } from "#types/Extended";
import type { Fn } from "#types/Fn";
import type { UnionToIntersection } from "#types/UnionToIntersection";

export type CompositionInput = PropertyComposer | readonly PropertyComposer[];

type FirstEntry<Entries extends readonly CompositionInput[]> =
  Entries extends readonly [infer First extends PropertyComposer, ...unknown[]]
    ? Exclude<keyof First, keyof PropertyDescriptor | "name"> extends never
      ? Entries
      : never
    : Entries;

type EntryDescriptors<Entry extends PropertyComposer> =
  Entry extends PropertyComposer<infer Name, infer Descriptor>
    ? Record<Name, Descriptor>
    : never;

export type ComposedEntry<Entry extends PropertyComposer> =
  Entry extends PropertyComposer
    ? DefinedProperties<EntryDescriptors<Entry>, Record<PropertyKey, undefined>>
    : never;

export type Composed<
  Base extends object,
  Entries extends readonly CompositionInput[],
> = Entries extends readonly [
  infer Head extends CompositionInput,
  ...infer Tail extends CompositionInput[],
]
  ? Composed<
      Head extends readonly PropertyComposer[]
        ? Composed<Base, Head>
        : Head extends PropertyComposer
          ? Extended<Base, ComposedEntry<Head>>
          : never,
      Tail
    >
  : Entries extends readonly []
    ? Base
    : Extended<
        Base,
        UnionToIntersection<
          ComposedEntry<Extract<Entries[number], PropertyComposer>>
        >
      >;

type InputEntry<Input extends CompositionInput> =
  Input extends readonly PropertyComposer[] ? Input[number] : Input;

type LockedNames<Entry> =
  Entry extends PropertyComposer<infer Name, infer Descriptor>
    ? Descriptor extends { configurable: false }
      ? Name
      : never
    : never;

type ValidEntries<
  Entries extends readonly CompositionInput[],
  Locked extends PropertyKey = never,
> = Entries extends readonly [
  infer Head extends CompositionInput,
  ...infer Tail extends CompositionInput[],
]
  ? Extract<InputEntry<Head>["name"], Locked> extends never
    ? readonly [
        Head,
        ...ValidEntries<Tail, Locked | LockedNames<InputEntry<Head>>>,
      ]
    : never
  : Entries;

function doCompose<
  Base extends Fn,
  const Entries extends readonly CompositionInput[],
>(
  base: Base,
  ...entries: Entries & ValidEntries<Entries>
): Base & Composed<{}, Entries>;
function doCompose<const Entries extends readonly CompositionInput[]>(
  ...entries: Entries & FirstEntry<Entries> & ValidEntries<Entries>
): Composed<{}, Entries>;
function doCompose<
  Base extends object,
  const Entries extends readonly CompositionInput[],
>(
  base: Base extends readonly PropertyComposer[]
    ? never
    : Base extends { name: PropertyKey }
      ? Exclude<keyof Base, keyof PropertyDescriptor | "name"> extends never
        ? never
        : Base
      : Base,
  ...entries: Entries & ValidEntries<Entries>
): Composed<Base, Entries>;
function doCompose(...inputs: readonly object[]): object {
  const [first, ...rest] = inputs;

  const hasBase = first && !isArray(first) && !isPropertyComposer(first);

  const target = hasBase ? first : create(null);

  const entries = (hasBase ? rest : inputs).flat() as PropertyComposer[];

  for (const entry of entries) {
    const { name, ...descriptor } = entry;

    defineProperty(target, name, descriptor);
  }

  return target;
}

export const compose = finalize(doCompose, {
  getter: getterComposer,
  getters: getterComposers,
  property: propertyComposer,
  properties: propertyComposers,
  value: valueComposer,
  values: valueComposers,
  method: valueComposer,
  methods: valueComposers,
});
