import { logChanges } from "./utils/logChanges";
import { codeFile, makeFromTemplate, testFile } from "./utils/make";
import { prependLine } from "./utils/prependLine";
import { replacer } from "./utils/replacer";

export async function makeFunction(options: { name: string }) {
  const functionName = options.name;

  const paths = await makeFromTemplate(
    [
      codeFile("function", ["functions", functionName]),
      testFile("function", ["functions", functionName]),
    ],
    replacer({
      function: functionName,
    }),
  );

  const index = await prependLine(
    "src/index.ts",
    `export { ${functionName} } from "@auaust/toolkit/${functionName}";`,
  );

  logChanges(`Function ${functionName} has been created.`, {
    created: paths,
    updated: [index],
  });
}
