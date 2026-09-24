import {
  codeFile,
  logChanges,
  makeFromTemplate,
  prependLine,
  replacer,
  testFile,
} from "./utils/make";

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
