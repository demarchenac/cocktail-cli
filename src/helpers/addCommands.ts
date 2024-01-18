import type { Command } from "commander";
import { flattenObject } from "./flatten";

export const addCommands = (program: Command, commands: Record<string, unknown>) => {
  const flattened = flattenObject(commands);
  for (const path in flattened) {
    let context: Command = program;
    const topDown = path.split(".");
    for (const command of topDown) {
      context = context.command(command);
    }

    if (path.indexOf("list") > -1) {
      context.option("-b, --browser-visible", "Displays the browser while scrapping data");
      context.option("--delay <delay>", "Navigation delay in seconds", "2");
    }

    context.action(flattened[path] as (...args: any[]) => void | Promise<void>);
  }

  program.parse(process.argv);
};
