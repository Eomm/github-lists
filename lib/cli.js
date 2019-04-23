#!/usr/bin/env node
'use strict'

const commist = require('commist')()
const parseArgs = require('./args');

['issue', 'repo-list'].forEach(command => {
  const fn = require(`./commands/${command}`)
  commist.register(command, async (args) => {
    const opts = parseArgs(args)
    // if (needToShowHelp(command, opts)) {
    //   return
    // }
    try {
      await fn(opts)
    } catch (error) {
      console.log(error)
    }
  })
})

const res = commist.parse(process.argv.splice(2))
if (res) {
  require('./commands/help')(['-h'])
}
