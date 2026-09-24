import { resolve } from "path";

export function pathRelativeFrom(root: string, ...paths: string[]) {
  return resolve(root, ...paths).replace(new RegExp(`^${root}[\\/\\\\]?`), "");
}
