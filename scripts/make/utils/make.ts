import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

import { isString } from "../../../src/utils/isString.js";
import { pathRelativeFrom } from "./pathResolveFrom.js";

const root = process.cwd();

export async function makeFromTemplate(
  files: { template: string; destination: string }[],
  transform: (content: string) => Promise<string> | string,
  options?: { override?: boolean },
) {
  const { override = false } = options ?? {};

  const paths: string[] = [];

  for (const file of files) {
    const template = resolve(root, "data/templates", file.template);

    const content = await readFile(template, "utf-8");

    const replacedContent = await transform(content);

    await mkdir(resolve(file.destination, ".."), {
      recursive: true,
    });

    nooverride: if (!override) {
      try {
        await readFile(file.destination, "utf-8");
      } catch {
        break nooverride;
      }

      throw new Error(
        `File already exists: ${file.destination}. Use the override option to replace it.`,
      );
    }

    await writeFile(file.destination, replacedContent);

    paths.push(pathRelativeFrom(root, file.destination));
  }

  return paths;
}

export function codeFile(template: string, file: string | string[]) {
  return {
    template: `${template}.txt`,
    destination: join("src", ...(isString(file) ? [file] : file)) + ".ts",
  };
}

export function testFile(template: string, file: string | string[]) {
  return {
    template: `${template}.test.txt`,
    destination:
      join("tests", ...(isString(file) ? [file] : file)) + ".test.ts",
  };
}
