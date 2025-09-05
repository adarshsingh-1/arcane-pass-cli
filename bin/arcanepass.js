#!/usr/bin/env node

const { Command } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const PasswordGenerator = require('../src/generator');
const Utils = require('../src/utils');

const program = new Command();
const generator = new PasswordGenerator();

program
  .name('arcane-pass')
  .description('ArcanePass - Stateless Password Generator')
  .version('1.0.0');

program
  .command('generate')
  .alias('gen')
  .description('Generate a password for a service')
  .option('-s, --service <service>', 'Service name')
  .option('-l, --length <length>', 'Password length', '16')
  .option('--show', 'Display password (hidden by default)')
  .option('-c, --copy', 'Copy to clipboard')
  .action(async (options) => {
    try {
      let service = options.service;
      if (!service) {
        const response = await inquirer.prompt([
          {
            type: 'input',
            name: 'service',
            message: 'Enter service name:',
            validate: (input) => input.trim() !== '' || 'Service name is required'
          }
        ]);
        service = response.service.trim();
      }

      const { masterPassword } = await inquirer.prompt([
        {
          type: 'password',
          name: 'masterPassword',
          message: 'Enter master password:',
          mask: '*'
        }
      ]);

      const passwordOptions = {
        length: parseInt(options.length)
      };

      const password = generator.generatePassword(masterPassword, service, passwordOptions);
      const strength = generator.validateStrength(password);

      console.log(chalk.blue(`\nPassword generated for: ${chalk.white(service)}`));
      Utils.displayPassword(password, !options.show);
      Utils.displayStrength(strength);

      if (options.copy) {
        await Utils.copyToClipboard(password);
      }

    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

program.parse();