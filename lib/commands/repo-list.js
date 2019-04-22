'use strict'

const Octokit = require('@octokit/rest')

module.exports = async function (args) {
  const octokit = new Octokit({ auth: args.token })

  const repos = await octokit.repos.listForOrg({
    org: args.owner,
    type: 'public',
    per_page: 100
  })

  repos.data.forEach(_ => {
    console.log(`${_.full_name}`)
  })
}
