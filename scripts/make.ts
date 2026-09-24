import { cli, command } from "cleye";
import { makeFunction } from "../codegen/makeFunction";
import { makeProtocol } from "../codegen/makeProtocol";
import { makeType } from "../codegen/makeType";

function exit(code: number = 0): never {
  process.exit(code);
}

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
        },
        parameters: ["<protocol name>"],
      },
      async (argv) => {
        return await makeProtocol({
          name: argv._[0],
          symbol: argv.flags.symbol,
          interface: argv.flags.interface,
        });
      },
    ),
    command(
      {
        name: "function",
        parameters: ["<function name>"],
      },
      async (argv) => {
        return await makeFunction({
          name: argv._[0],
        });
      },
    ),
    command(
      {
        name: "type",
        parameters: ["<type name>"],
      },
      async (argv) => {
        return await makeType({
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
