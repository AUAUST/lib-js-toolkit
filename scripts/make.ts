import { cli, command } from "cleye";

import { makeProtocol } from "../codegen/makeProtocol";
import { makeType } from "../codegen/makeType";
import { makeUtilility } from "../codegen/makeUtilility";

function exit(code: number = 0): never {
  process.exit(code);
}

const override = {
  type: Boolean,
  alias: "o",
  description: "Whether to override existing files",
};

const argv = cli({
  name: "make",
  commands: [
    command(
      {
        name: "protocol",
        flags: {
          symbol: {
            type: String,
            alias: "s",
            description: "The symbol name for the protocol",
            placeholder: "<symbol name>",
          },
          interface: {
            type: String,
            alias: "i",
            description: "The interface name for the protocol",
            placeholder: "<interface name>",
          },
          override,
        },
        parameters: ["<protocol name>"],
      },
      async (argv) => {
        return await makeProtocol({
          ...argv.flags,
          name: argv._[0],
        });
      },
    ),
    command(
      {
        name: "function",
        flags: {
          override,
        },
        parameters: ["<function name>"],
      },
      async (argv) => {
        return await makeUtilility({
          ...argv.flags,
          name: argv._[0],
        });
      },
    ),
    command(
      {
        name: "type",
        flags: {
          override,
        },
        parameters: ["<type name>"],
      },
      async (argv) => {
        return await makeType({
          ...argv.flags,
          name: argv._[0],
        });
      },
    ),
  ],
});

if (argv.command === undefined) {
  argv.showHelp();
  exit();
}

try {
  await argv;
} catch (error) {
  console.error(`\x1b[31m${String(error)}\x1b[0m\n`);
  exit(1);
}
