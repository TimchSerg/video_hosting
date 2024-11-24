import yargs = require('yargs')
import { DatabaseHelper } from 'cli/helpers'
import * as DatabaseProviders from 'src/database/providers'

export interface Arguments extends yargs.Arguments {
  to: string
  from: string
  migrations: string
}

function builder(yargs: yargs.Argv): yargs.Argv {
  return yargs
    .option('to', {
      alias: 't',
      describe: 'seeder to',
      type: 'string'
    })
    .option('from', {
      alias: 'f',
      describe: 'seeder from',
      type: 'string'
    })
    .option('migrations', {
      alias: 'mg',
      describe: 'run specific seeder (ignore order)',
      type: 'array'
    })
    .conflicts('migrations', ['to', 'from'])
}

function handler(argv: yargs.Arguments) {
  DatabaseHelper.runSeeder(argv as DatabaseProviders.UpOptions)
    .catch(err => console.error(err.message))
}

export default {
  builder: builder,
  handler: handler
}