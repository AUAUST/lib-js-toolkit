import { logChanges } from "./utils/logChanges";
import { codeFile, makeFromTemplate, testFile } from "./utils/make";
import { prependLine } from "./utils/prependLine";
import { replacer } from "./utils/replacer";

export async function makeUtility(options: {
  name: string;
  override?: boolean | undefined;
}) {
  const utilityName = options.name;

  const paths = await makeFromTemplate(
    [
      codeFile("utility", ["utils", utilityName]),
      testFile("utility", ["utils", utilityName]),
    ],
    replacer({
      utility: utilityName,
    }),
    {
      override: options.override,
    },
  );

  const index = await prependLine(
    "src/index.ts",
    `export { ${utilityName} } from "@auaust/toolkit/${utilityName}";`,
  );

  logChanges(`Function ${utilityName} has been created.`, {
    created: paths,
    updated: [index],
  });
}
