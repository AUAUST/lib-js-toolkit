import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const run = promisify(execFile);
const root = resolve(import.meta.dirname, "../../..");
const engrenage = join(root, "node_modules/.bin/engrenage");
const extension = join(root, "tooling/barrels/index.ts");

const config = `import { defineConfig } from "@auaust/engrenage/config";
import { entry, index, utils } from "@auaust/engrenage/roles";
import { createBarrelsExtension } from ${JSON.stringify(extension)};

export default defineConfig({
  preset: "library",
  extensions: [createBarrelsExtension()],
  src: {
    roles: [entry(), index(), utils({ public: true, collected: true })],
    structure: {
      namespaces: {
        modules: { children: "domains", purpose: "Modules.", domains: { "*": { public: true } } },
      },
    },
  },
});
`;

const baseFiles: Record<string, string> = {
  "package.json": `{ "name": "fixture", "version": "0.0.0", "type": "module", "private": true }\n`,
  "engrenage.config.ts": config,
  "src/entry.ts": "// @barrel domains\n// @end\n",
  "src/modules/string/.domain.json": `{ "purpose": "Strings." }\n`,
  "src/modules/parse/.domain.json": `{ "purpose": "Parsers." }\n`,
  "src/modules/assert/.domain.json": `{ "purpose": "Assertions." }\n`,
  "src/modules/ensure/.domain.json": `{ "purpose": "Ensured values." }\n`,
  "src/modules/string/utils/toString.ts": "/** @shorthand s */\nexport function toString(value: unknown): string {\n  return String(value);\n}\n",
  "src/modules/string/utils/parseString.ts": "export function parseString(value: unknown): string {\n  return String(value);\n}\n",
  "src/modules/assert/utils/assertString.ts": "export function assertString(value: unknown): asserts value is string {}\n",
  "src/modules/assert/utils/assert.ts": "export function assert(value: unknown): asserts value {}\n",
  "src/modules/ensure/utils/defined.ts": "/** @root */\nexport function defined<T>(value: T): T {\n  return value;\n}\n",
};

let fixture: string | undefined;

async function createFixture(files: Record<string, string>): Promise<string> {
  const cache = join(root, "node_modules/.cache");

  await mkdir(cache, { recursive: true });

  const directory = await mkdtemp(join(cache, "barrels-"));

  for (const [file, content] of Object.entries(files)) {
    const path = join(directory, file);

    await mkdir(dirname(path), { recursive: true });

    await writeFile(path, content);
  }

  fixture = directory;

  return directory;
}

async function sync(directory: string, ...flags: string[]) {
  return run(engrenage, ["sync", "barrels", "barrel-blocks", ...flags], {
    cwd: directory,
  });
}

async function readEntry(directory: string, file: string): Promise<string> {
  return readFile(join(directory, file), "utf-8");
}

afterEach(async () => {
  if (fixture != null) {
    await rm(fixture, { recursive: true, force: true });
  }

  fixture = undefined;
});

describe("createBarrelsExtension", () => {
  it(
    "contributes shorthands, parsers, guard variants and root names",
    { timeout: 60_000 },
    async () => {
      const directory = await createFixture(baseFiles);

      await sync(directory);

      await sync(directory, "--check");

      const stringEntry = await readEntry(
        directory,
        "src/modules/string/entry.ts",
      );

      const parseEntry = await readEntry(
        directory,
        "src/modules/parse/entry.ts",
      );

      const assertEntry = await readEntry(
        directory,
        "src/modules/assert/entry.ts",
      );

      const rootEntry = await readEntry(directory, "src/entry.ts");

      expect(stringEntry).toContain("export { toString }");
      expect(stringEntry).toContain("export { toString as s }");
      expect(parseEntry).toContain("export { parseString as string }");
      expect(assertEntry).toContain("export { assertString as isString }");
      expect(assertEntry).toContain("export { assert }");
      expect(assertEntry).not.toContain("export { assertString }");
      expect(rootEntry).toContain("export { toString }");
      expect(rootEntry).toContain("export { toString as s }");
      expect(rootEntry).toContain("export { assertString }");
      expect(rootEntry).toContain("export { defined }");
      expect(rootEntry).not.toContain("export { assert }");
    },
  );

  it(
    "exports a shorthand repeated on overload signatures once",
    { timeout: 60_000 },
    async () => {
      const directory = await createFixture({
        ...baseFiles,
        "src/modules/string/utils/toString.ts": "/** @shorthand s */\nexport function toString(value: string): string;\n/** @shorthand s */\nexport function toString(value: unknown): string;\nexport function toString(value: unknown): string {\n  return String(value);\n}\n",
      });

      await sync(directory);

      await sync(directory, "--check");

      const stringEntry = await readEntry(
        directory,
        "src/modules/string/entry.ts",
      );

      expect(stringEntry.split("export { toString as s }")).toHaveLength(2);
    },
  );

  it(
    "fails when a shorthand collides with another export of its module",
    { timeout: 60_000 },
    async () => {
      const directory = await createFixture({
        ...baseFiles,
        "src/modules/string/utils/toString.ts": "/** @shorthand parseString */\nexport function toString(value: unknown): string {\n  return String(value);\n}\n",
      });

      await expect(sync(directory)).rejects.toThrow(
        /toString\.ts[\s\S]*parseString\.ts|parseString\.ts[\s\S]*toString\.ts/u,
      );
    },
  );
});
