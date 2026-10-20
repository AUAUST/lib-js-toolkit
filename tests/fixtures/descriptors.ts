import { defineProperties } from "@auaust/toolkit/object";

export function createDescriptorSource() {
  function getThree() {
    return 3;
  }

  function getFour() {
    return 4;
  }

  function setValue(_value: number) {}

  return defineProperties(
    {},
    {
      locked: {
        value: 1 as number,
        enumerable: false,
        configurable: false,
      },
      mutable: {
        value: 2 as number,
        writable: true,
        enumerable: true,
        configurable: true,
      },
      getter: {
        get: getThree,
        enumerable: true,
        configurable: true,
      },
      writable: {
        get: getFour,
        set: setValue,
        enumerable: false,
        configurable: true,
      },
    },
  );
}
