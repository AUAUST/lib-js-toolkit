import { callable } from "@auaust/toolkit/protocol";

export function createPair() {
  return {
    a: 1,
    b: 2,
  };
}

export function createTriple() {
  return {
    ...createPair(),
    c: 3,
  };
}

export function createKeyMapper() {
  function rename(this: { key: "renamed" }, _key: "entry", _value: number) {
    return this.key;
  }

  return {
    key: "renamed" as const,
    [callable]: rename,
  };
}

export function createValueTransformer() {
  function transform(
    this: { factor: number },
    value: number,
    key: "entry",
    sourceKey: "entry",
  ) {
    return `${value * this.factor}:${key}:${sourceKey}`;
  }

  return {
    factor: 2,
    [callable]: transform,
  };
}
