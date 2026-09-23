import { mkdir, readFile, writeFile } from "fs/promises";
import { resolve } from "path";

export async function makeProtocol(options: {
  name: string;
  symbol?: string;
  interface?: string;
}) {
  const root = process.cwd();

  const protocolName = options.name;

  const symbolName = options.symbol || protocolName;

  const interfaceName =
    options.interface ||
    protocolName.at(0)!.toUpperCase() + protocolName.slice(1);

  const files = [
    {
      template: "protocol.txt",
      destination: resolve(root, "src/protocols", protocolName, "index.ts"),
    },
    {
      template: "protocol.test.txt",
      destination: resolve(root, "tests/protocols", `${protocolName}.test.ts`),
    },
  ];

  const placeholders = (content: string) => {
    return content
      .replace(/\{\{\s*protocol\s*\}\}/g, protocolName)
      .replace(/\{\{\s*symbol\s*\}\}/g, symbolName)
      .replace(/\{\{\s*interface\s*\}\}/g, interfaceName);
  };

  for (const file of files) {
    const template = resolve(root, "codegen/templates", file.template);

    const content = await readFile(template, "utf-8");

    const replacedContent = placeholders(content);

    await mkdir(resolve(file.destination, ".."), { recursive: true });

    await writeFile(file.destination, replacedContent);
  }

  console.log(`Protocol ${protocolName} has been created.`);

  console.log(
    files
      .map((file) => "  " + file.destination.replace(root, "").slice(1))
      .join("\n"),
  );
}
