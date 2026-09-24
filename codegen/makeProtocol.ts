import { logChanges } from "./utils/logChanges";
import { codeFile, makeFromTemplate, testFile } from "./utils/make";
import { replacer } from "./utils/replacer";

export async function makeProtocol(options: {
  name: string;
  symbol?: string;
  interface?: string;
}) {
  const protocolName = options.name;

  const symbolName = options.symbol || protocolName;

  const interfaceName =
    options.interface ||
    protocolName.at(0)!.toUpperCase() + protocolName.slice(1);

  const paths = await makeFromTemplate(
    [
      codeFile("protocol", ["protocols", protocolName, "index"]),
      testFile("protocol", ["protocols", protocolName]),
    ],
    replacer({
      protocol: protocolName,
      symbol: symbolName,
      interface: interfaceName,
    }),
  );

  logChanges(`Protocol ${protocolName} has been created.`, {
    created: paths,
  });
}
