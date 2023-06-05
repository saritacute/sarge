#!/usr/bin/env node

import chalk from 'chalk';

type CommandProp = {
  description: string;
  fn: (input: string[]) => void;
};

type Commands = Record<string, CommandProp>;

const commands: Commands = {
  print: {
    description: 'hello',
    fn: invoke,
  },
  help: {
    description: 'SOS',
    fn: printHelp,
  },
};

function printHelp() {
  console.log(chalk.green('Here are the commands that you can use\n'));
  for (const key in commands) {
    const { description } = commands[key];
    console.log(chalk.green(`${key} - ${description}`));
  }
}

function invoke(this: CommandProp, input: string[]) {
  console.log(`${this.description} - ${input}`);
}

function main() {
  const [_, , ...rest] = process.argv;

  if (!rest.length) return;

  const [mainCommand, ...extras] = rest;

  if (!Object.keys(commands).includes(mainCommand)) {
    console.log(chalk.red(`${mainCommand} is invalid`));
    return;
  }

  commands[mainCommand].fn(extras);
}

main();
