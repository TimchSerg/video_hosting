import yargs = require('yargs')
import { DatabaseHelper } from 'cli/helpers'

function builder(yargs: yargs.Argv): yargs.Argv {
  // do nothing
  return yargs
}

function handler() {
  DatabaseHelper.createDatabase()
    .catch(err => console.error(err.message))
}

export default {
  builder: builder,
  handler: handler
}
