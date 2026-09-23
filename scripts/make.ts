import { cli, command } from "cleye";
import { makeProtocol } from "../codegen/makeProtocol";

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
        strictFlags: true,
      },
      async (argv) => {
        return await makeProtocol({
          name: argv._[0],
          symbol: argv.flags.symbol,
          interface: argv.flags.interface,
        });
      },
    ),
  ],
});

if (argv.command === undefined) {
  argv.showHelp();
  exit();
}
