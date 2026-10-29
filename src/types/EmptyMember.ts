import type { Countable } from "#modules/protocol/types/Countable";
import type { Emptiable } from "#modules/protocol/types/Emptiable";
import type { EmptyCountable } from "#modules/protocol/types/EmptyCountable";
import type { EmptyContainer } from "#types/EmptyContainer";
import type { EmptyString } from "#types/EmptyString";
import type { EmptyValue } from "#types/EmptyValue";

export type EmptyMember<Value> = Value extends null | undefined
  ? Value
  : Value extends number | bigint | boolean | symbol
    ? never
    : Value extends string
      ? EmptyString<Value>
      : Value extends Emptiable<false>
        ? never
        : Value extends Emptiable
          ? Emptiable<true>
          : Value extends Countable
            ? EmptyCountable
            : Value extends object
              ? EmptyContainer<Value>
              : | EmptyValue
                | EmptyString
                | EmptyCountable
                | { length: 0 }
                | { size: 0 };
