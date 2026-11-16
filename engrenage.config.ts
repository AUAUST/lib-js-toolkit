import { define, defineConfig } from "@auaust/engrenage/config";
import {
  constants,
  entry,
  errors,
  fixtures,
  index,
  operations,
  role,
  testutils,
  types,
  utils,
} from "@auaust/engrenage/roles";

import { createBarrelsExtension } from "#tooling/barrels/index";
import { native, relates, root, shorthand } from "#tooling/tags/index";

const guards = role({
  name: "guards",
  purpose: "Type predicates over a candidate, exported by the module and the guard entry.",
  exports: {
    values: "named-match",
    types: "named",
  },
  effects: "confined",
  public: true,
  collected: true,
  companions: {
    resolve({ name }) {
      const rest = name.slice("is".length);

      const companions = [
        `src/modules/assert/utils/assert${rest}.ts`,
        `src/modules/ensure/utils/ensure${rest}.ts`,
      ];

      return /^isNot[A-Z]/u.test(name)
        ? companions
        : [...companions, `src/modules/when/utils/when${rest}.ts`];
    },
    description: "src/modules/assert/utils/assert<Rest>.ts, src/modules/ensure/utils/ensure<Rest>.ts, src/modules/when/utils/when<Rest>.ts (except isNot<Upper>…) for is<Rest>.ts",
  },
});

const symbols = role({
  name: "symbols",
  purpose: "Symbols a module defines, re-exported by its entry.",
  file: ["symbols.ts"],
  effects: "pure",
  public: true,
  collected: true,
});

const internals = role({
  name: "internals",
  purpose: "Helpers shared inside a module, never re-exported.",
  exports: "named-match",
  effects: "confined",
  public: false,
});

export default defineConfig({
  preset: "library",
  visibility: "private",
  extensions: [createBarrelsExtension()],
  agents: {
    preferred: ["claude", "codex"],
    attribution: false,
  },
  define: {
    values({ packageJson: { name, version, license } }) {
      return {
        __NAME__: define(name, {
          exact: true,
        }),
        __VERSION__: define(version, {
          type: "`${number}.${number}.${number}`",
        }),
        __LICENSE__: license,
      };
    },
  },
  src: {
    baseline: "2026-10",
    apis: ["timers", "performance", "console", "crypto"],
    roles: [
      entry(),
      index(),
      constants({
        effects: "confined",
      }),
      utils({
        public: true,
        collected: true,
      }),
      types({
        public: true,
        collected: true,
        index: "root",
        subpath: "root",
        reexport: "flat",
      }),
      errors({
        index: true,
        subpath: true,
        reexport: "flat",
      }),
      guards,
      symbols,
      internals,
    ],
    structure: {
      namespaces: {
        modules: {
          children: "domains",
          purpose: "One module per kind of value, each a package entry.",
          domains: {
            "*": { public: true },
          },
        },
      },
    },
  },
  tests: {
    roles: [testutils(), fixtures()],
    mirror: true,
  },
  tooling: {
    // @debt explicit only because engrenage writes no tsconfig for tooling while the scripts environment it inherits from is inactive (AUAUST/lib-js-engrenage#521)
    tsconfig: {},
    roles: [
      index(),
      utils(),
      operations({
        purpose: "Functions that read the project's files or structure, one per module.",
        effects: "observing",
        public: false,
      }),
    ],
  },
  format: {
    maxCognitiveComplexity: 10,
  },
  docs: {
    tags: {
      append: [shorthand(), root(), native(), relates()],
    },
  },
});
