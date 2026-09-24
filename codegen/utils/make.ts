import { mkdir, readFile, writeFile } from "fs/promises";
import { join, resolve } from "path";
import { pathRelativeFrom } from "./pathResolveFrom";

const root = process.cwd();

export async function makeFromTemplate(
  files: { template: string; destination: string }[],
  transform: (content: string) => Promise<string> | string,
) {
  const paths: string[] = [];

  for (const file of files) {
    const template = resolve(root, "codegen/templates", file.template);

    const content = await readFile(template, "utf-8");

    const replacedContent = await transform(content);

    await mkdir(resolve(file.destination, ".."), { recursive: true });

    await writeFile(file.destination, replacedContent);

    paths.push(pathRelativeFrom(root, file.destination));
  }

  return paths;
}

export function codeFile(template: string, file: string | string[]) {
  return {
    template: `${template}.txt`,
    destination:
      join("src", ...(typeof file === "string" ? [file] : file)) + ".ts",
  };
}

export function testFile(template: string, file: string | string[]) {
  return {
    template: `${template}.test.txt`,
    destination:
      join("tests", ...(typeof file === "string" ? [file] : file)) + ".test.ts",
  };
}
