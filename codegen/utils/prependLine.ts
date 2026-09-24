import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { pathRelativeFrom } from "./pathResolveFrom";

const root = process.cwd();

export async function prependLine(file: string, line: string) {
  const path = resolve(root, file);

  await writeFile(path, `${line}\n${await readFile(path, "utf-8")}`);

  return pathRelativeFrom(root, path);
}
