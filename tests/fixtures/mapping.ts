export const mappingCases = [
  [
    "identity",
    undefined,
    undefined,
    [
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ],
  ],
  [
    "explicit names",
    {
      a: "alpha",
      b: "beta",
    },
    undefined,
    [
      ["alpha", 1],
      ["beta", 2],
      ["c", 3],
    ],
  ],
  [
    "computed names",
    (key: string) => key.toUpperCase(),
    undefined,
    [
      ["A", 1],
      ["B", 2],
      ["C", 3],
    ],
  ],
  [
    "values",
    undefined,
    (value: number) => value * 10,
    [
      ["a", 10],
      ["b", 20],
      ["c", 30],
    ],
  ],
  [
    "names and values",
    {
      a: "alpha",
      b: "beta",
    },
    (value: number) => value + 5,
    [
      ["alpha", 6],
      ["beta", 7],
      ["c", 8],
    ],
  ],
  [
    "excluded name",
    {
      a: false,
    },
    undefined,
    [
      ["b", 2],
      ["c", 3],
    ],
  ],
  [
    "control values",
    (key: string) => {
      return key === "a" ? undefined : key === "b" ? true : "renamed";
    },
    undefined,
    [
      ["b", 2],
      ["renamed", 3],
    ],
  ],
  [
    "false control value",
    (key: string) => {
      return key === "a" ? false : key === "b" ? true : "renamed";
    },
    undefined,
    [
      ["b", 2],
      ["renamed", 3],
    ],
  ],
  [
    "swapped names",
    {
      a: "b",
      b: "a",
    },
    (value: number) => value * 10,
    [
      ["a", 20],
      ["b", 10],
      ["c", 30],
    ],
  ],
  [
    "overwritten exclusion",
    {
      a: "b",
      b: false,
    },
    (value: number) => value * 10,
    [
      ["b", 10],
      ["c", 30],
    ],
  ],
] as const;
