'use strict'

const argv = require('yargs-parser')

module.exports = function parsedArgs (args) {
  const parsedArgs = argv(args, {
    string: ['token', 'owner'],
    array: ['repo'],
    boolean: ['help', 'count'],
    alias: {
      help: ['h'],
      token: ['k'],
      owner: ['o'],
      repo: ['r'],
      count: ['c']
    },
    default: {
      help: false
    }
  })

  const token = process.env[parsedArgs.token] || parsedArgs.token

  // remove the aliases this way
  return Object.assign({}, {
    _: parsedArgs._,
    help: parsedArgs.help,
    token,
    owner: parsedArgs.owner,
    repo: parsedArgs.repo,
    count: parsedArgs.count
  })
}
