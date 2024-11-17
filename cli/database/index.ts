import yargs = require('yargs');
import * as commands from 'cli/database/commands'
import { Mode } from 'utils/constants';

yargs
  .help()
  .version()
  .option('mode', {
    alias: 'm',
    describe: 'application mode',
    type: 'string',
    // default: Mode.DEVELOPMENT,
    default: '',
    choices: [ Mode.DEVELOPMENT, Mode.TEST, Mode.PRODUCTION, "" ]
  })
  .middleware((yargs) => {
    console.log(yargs.mode)
    process.env.NODE_ENV = yargs.mode 
  })
  .command('create', 'create database', commands.create)
  .command('drop', 'drop database', commands.drop)
  .command('up', 'run database migrations', commands.up)
  .command('upSeeder', 'run database seeder', commands.upSeeder)
  .command('down', 'undo database migration', commands.down)
  .demandCommand()
  .help()
  .argv
