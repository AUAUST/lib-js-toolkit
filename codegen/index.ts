import PackageJson from "@npmcli/package-json";

let packageJsonContent: PackageJson.Content | undefined;

export async function getPackageJsonContent(): Promise<PackageJson.Content> {
  return (packageJsonContent ??= (await PackageJson.load(process.cwd()))
    .content);
}

export async function getCompileTimeVariables(): Promise<
  Record<string, string>
> {
  const packagejson = await getPackageJsonContent();

  const variables = {
    __NAME__: packagejson.name,
    __VERSION__: packagejson.version,
    __LICENSE__: packagejson.license,
    __TIMESTAMP__: new Date().toISOString(),
  };

  return Object.fromEntries(
    Object.entries(variables).map(([key, value]) => [
      key,
      JSON.stringify(value),
    ]),
  );
}
