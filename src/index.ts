#!/usr/bin/env node

import { Command } from "commander";
import { commands } from "./commands";
import { addCommands } from "./helpers/addCommands";

const program = new Command();

addCommands(program, commands);
