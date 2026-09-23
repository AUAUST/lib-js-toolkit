import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { codeFile, makeFromTemplate, replacer, testFile } from "./utils/make";

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

  const index = resolve("src/index.ts");

  const statement = `export { ${functionName} } from "@auaust/toolkit/${functionName}";\n`;

  const indexContent = await readFile(index, "utf-8");

  await writeFile(index, statement + indexContent);

  console.log(`Function ${functionName} has been created.`);

  console.log(paths.map((file) => "  " + file).join("\n"));
}
