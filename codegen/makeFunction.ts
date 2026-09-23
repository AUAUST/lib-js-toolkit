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

  console.log(`Function ${functionName} has been created.`);

  console.log(paths.map((file) => "  " + file).join("\n"));
}
