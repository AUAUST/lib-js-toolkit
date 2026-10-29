import type { Countable } from "#modules/protocol/types/Countable";
import type { Emptiable } from "#modules/protocol/types/Emptiable";
import type { EmptyCountable } from "#modules/protocol/types/EmptyCountable";
import type { FilledContainer } from "#types/FilledContainer";
import type { FilledString } from "#types/FilledString";

export type FilledMember<Value> = Value extends null | undefined
  ? never
  : Value extends number | bigint | boolean | symbol
    ? Value
    : Value extends string
      ? FilledString<Value>
      : Value extends Emptiable<true>
        ? never
        : Value extends Emptiable<false>
          ? Value
          : Value extends Emptiable
            ? Emptiable<false>
            : Value extends Countable
              ? Value extends EmptyCountable
                ? never
                : Value
              : Value extends object
                ? FilledContainer<Value>
                : string | number | bigint | boolean | symbol | object;
