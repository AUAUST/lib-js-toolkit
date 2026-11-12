import { define, defineConfig } from "@auaust/engrenage/config";
import {
  constants,
  createRolePreset,
  entry,
  errors,
  fixtures,
  index,
  testutils,
  types,
  utils,
} from "@auaust/engrenage/roles";

const guards = createRolePreset({
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

      return [
        `src/modules/assert/utils/assert${rest}.ts`,
        `src/modules/ensure/utils/ensure${rest}.ts`,
      ];
    },
    description: "src/modules/assert/utils/assert<Rest>.ts, src/modules/ensure/utils/ensure<Rest>.ts for is<Rest>.ts",
  },
});

const symbols = createRolePreset({
  name: "symbols",
  purpose: "Symbols a module defines, re-exported by its entry.",
  file: ["symbols.ts"],
  effects: "pure",
  public: true,
  collected: true,
});

const internals = createRolePreset({
  name: "internals",
  purpose: "Helpers shared inside a module, never re-exported.",
  exports: "named-match",
  effects: "confined",
  public: false,
});

export default defineConfig({
  preset: "library",
  visibility: "private",
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
    apis: ["timers", "performance", "console", "disposable", "float16"],
    roles: [
      entry(),
      index(),
      constants(),
      utils({ public: true, collected: true }),
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
      guards(),
      symbols(),
      internals(),
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
  scripts: {
    tree: "domains",
  },
});
