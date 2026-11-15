import { otherObjectsLeaf, typeParents } from "@auaust/toolkit/guard/constants";

type TypeNode = keyof typeof typeParents;

function leafOf(value: unknown): TypeNode {
  if (value === null) {
    return "null";
  }

  if (Array.isArray(value)) {
    return "array";
  }

  const type = typeof value;

  return type === "object" ? otherObjectsLeaf : type;
}

export function typeChainOf(value: unknown): readonly TypeNode[] {
  const chain: TypeNode[] = [];

  for (
    let node: TypeNode | null = leafOf(value);
    node !== null;
    node = typeParents[node]
  ) {
    chain.push(node);
  }

  return chain;
}
