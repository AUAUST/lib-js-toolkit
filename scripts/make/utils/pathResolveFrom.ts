import { resolve } from "node:path";

export function pathRelativeFrom(root: string, ...paths: string[]) {
  return resolve(root, ...paths).replace(
    new RegExp(String.raw`^${root}[\/\\]?`),
    "",
  );
}
