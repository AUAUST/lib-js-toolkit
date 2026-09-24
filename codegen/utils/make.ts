import { mkdir, readFile, writeFile } from "fs/promises";
import { join, resolve } from "path";

export async function makeFromTemplate(
  files: { template: string; destination: string }[],
  transform: (content: string) => Promise<string> | string,
) {
  const root = process.cwd();

  const paths: string[] = [];

  for (const file of files) {
    const template = resolve(root, "codegen/templates", file.template);

    const content = await readFile(template, "utf-8");

    const replacedContent = await transform(content);

    await mkdir(resolve(file.destination, ".."), { recursive: true });

    await writeFile(file.destination, replacedContent);

    paths.push(file.destination.replace(root, "").replace(/^\/+/, ""));
  }

  return paths;
}

export async function prependLine(file: string, line: string) {
  const root = process.cwd();

  const path = resolve(root, file);

  await writeFile(path, `${line}\n${await readFile(path, "utf-8")}`);

  return path;
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

export function replacer(placeholders: Record<string, string>) {
  const expressions = Object.entries(placeholders).map(
    ([key, value]) =>
      [new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, "g"), value] as const,
  );

  return (content: string) => {
    let result = content;

    for (const [regex, value] of expressions) {
      result = result.replace(regex, value);
    }

    return result;
  };
}

export function logChanges(
  message: string,
  changes: {
    created?: string[];
    updated?: string[];
  },
) {
  console.info(
    message,
    (changes.created || []).map((file) => `+   ${file}`).join("\n"),
    (changes.updated || []).map((file) => `~   ${file}`).join("\n"),
  );
}
