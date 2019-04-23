'use strict'

const Octokit = require('@octokit/rest')

module.exports = async function (args) {
  const octokit = new Octokit({ auth: args.token })

  const repos = args.repo
    .map(r => {
      const info = r.split('/')
      return {
        owner: info[0],
        repo: info[1]
      }
    })
    .map(r => {
      return octokit.issues.listForRepo({
        ...r,
        state: 'open',
        per_page: 100
      })
    })

  if (args.count === true) {
    console.log(`Issue | PR | Repo`)
    console.log(`------|----|-----`)
  }

  for await (const issueList of repos) {
    if (args.count === true) {
      const data = partition(issueList.data)
      const repoUrl = issueList.url.substr(29, issueList.url.length - 60)
      // console.log(`${repoUrl} = Issues ${data.issue.length} PR: ${data.pr.length}`)
      console.log(`${data.issue.length} | ${data.pr.length} | ${repoUrl}`)
    } else {
      issueList.data.forEach(_ => {
        console.log(`${_.repository_url.substr(29)} # ${_.updated_at} - ${_.pull_request ? '🚀' : '🐛'} ${_.title} = (${_.html_url})`)
      })
    }
  }
}

function partition (issues) {
  return issues.reduce(({ issue, pr }, element) => {
    if (element.pull_request) {
      pr.push(element)
    } else {
      issue.push(element)
    }
    return { issue, pr }
  }, { issue: [], pr: [] })
}
