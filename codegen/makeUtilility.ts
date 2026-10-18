import { logChanges } from "./utils/logChanges";
import { codeFile, makeFromTemplate, testFile } from "./utils/make";
import { prependLine } from "./utils/prependLine";
import { replacer } from "./utils/replacer";

export async function makeUtilility(options: {
  name: string;
  override?: boolean;
}) {
  const utililityName = options.name;

  const paths = await makeFromTemplate(
    [
      codeFile("utilility", ["utils", utililityName]),
      testFile("utilility", ["utils", utililityName]),
    ],
    replacer({
      utilility: utililityName,
    }),
    {
      override: options.override,
    },
  );

  const index = await prependLine(
    "src/index.ts",
    `export { ${utililityName} } from "@auaust/toolkit/${utililityName}";`,
  );

  logChanges(`Function ${utililityName} has been created.`, {
    created: paths,
    updated: [index],
  });
}
