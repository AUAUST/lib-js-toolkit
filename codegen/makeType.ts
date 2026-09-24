import { logChanges } from "./utils/logChanges";
import { codeFile, makeFromTemplate, testFile } from "./utils/make";
import { prependLine } from "./utils/prependLine";
import { replacer } from "./utils/replacer";

export async function makeType(options: { name: string }) {
  const typeName = options.name;

  const paths = await makeFromTemplate(
    [
      codeFile("type", ["types", typeName]),
      testFile("type", ["types", typeName]),
    ],
    replacer({
      type: typeName,
    }),
  );

  const index = await prependLine(
    "src/types.ts",
    `export type { ${typeName} } from "./types/${typeName}";`,
  );

  logChanges(`Type ${typeName} has been created.`, {
    created: paths,
    updated: [index],
  });
}
