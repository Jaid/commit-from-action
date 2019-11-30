/** @module commit-from-action */

import {getInput} from "@actions/core"
import {context, GitHub} from "@actions/github"
import isGitRepoDirty from "is-git-repo-dirty"
import nanoid from "nanoid"
import {exec} from "@actions/exec"
import resolveAny from "resolve-any"
import chalk from "chalk"
import zahl from "zahl"

/**
 * @typedef {Object} Options
 * @prop {*} commitMessage
 * @prop {*} mergeMessage
 * @prop {*} pullRequestTitle
 * @prop {*} pullRequestBody
 * @prop {*} branchPrefix
 * @prop {boolean} autoApprove
 * @prop {boolean} autoRemoveBranch
 * @prop {string} githubTokenInputName
 */

/**
 * @class
 * @example
 * import CommitManager from "commit-from-action"
 * const commitManager = new CommitManager
 */
export default class {

  /**
   * @type {number}
   */
  commits = 0

  /**
   * @type {string}
   */
  branch = null

  /**
   * @constructor
   * @param {Options} [initialValues]
   */
  constructor(options = {}) {
    this.options = {
      commitMessage: "Modified repository in GitHub Action",
      mergeMessage: pullNumber => `Automatically merged commits from pull #${pullNumber}`,
      pullRequestTitle: "Automatic changes from GitHub Action",
      pullRequestBody: "Hewwo!",
      autoApprove: true,
      autoRemoveBranch: true,
      githubTokenInputName: "githubToken",
      branchPrefix: "action-",
      ...options,
    }
  }

  /**
   * @returns {Promise<void>}
   */
  async prepare() {
    if (this.branch) {
      return
    }
    let branchId
    if (context.sha) {
      branchId = context.sha.slice(0, 8)
    } else {
      branchId = nanoid("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 8)
    }
    const branchPrefix = await resolveAny(this.options.branchPrefix)
    this.branch = `${branchPrefix}-${branchId}`
    await exec("git", ["config", "user.email", "action@github.com"])
    await exec("git", ["config", "user.name", "GitHub Action"])
    await exec("git", ["checkout", "-b", this.branch])
  }

  /**
   * @returns {Promise<boolean>}
   */
  async commit(commitMessage) {
    const isDirty = await isGitRepoDirty()
    if (!isDirty) {
      return false
    }
    await this.prepare()
    await exec("git", ["add", "--all"])
    const message = commitMessage || this.options.commitMessage
    await exec("git", ["commit", "--all", "--message", message])
    this.commits++
    return true
  }

  /**
   * @returns {Promise<void>}
   */
  async push() {
    if (!this.commits) {
      return
    }
    this.githubToken = getInput(this.options.githubTokenInputName, {required: true})
    await exec("git", ["push", `https://${process.env.GITHUB_ACTOR}:${this.githubToken}@github.com/${process.env.GITHUB_REPOSITORY}.git`, `HEAD:${this.branch}`])
    const octokit = new GitHub(this.githubToken)
    const pullCreateResult = await octokit.pulls.create({
      ...context.repo,
      title: await resolveAny(this.options.pullRequestTitle),
      body: await resolveAny(this.options.pullRequestBody),
      head: this.branch,
      base: "master",
    })
    const pullLink = `https://github.com/${process.env.GITHUB_REPOSITORY}/pull/${pullCreateResult.data.number}`
    console.log(`Pull with ${zahl(this.commits, "commit")} created: ${chalk.greenBright(pullLink)}`)
    if (!this.options.autoApprove) {
      return
    }
    await octokit.pulls.merge({
      ...context.repo,
      pull_number: pullCreateResult.data.number,
      commit_title: await resolveAny(this.options.mergeMessage, pullCreateResult.data.number),
    })
    if (!this.options.autoRemoveBranch) {
      return
    }
    await octokit.git.deleteRef({
      ...context.repo,
      ref: `heads/${this.branch}`,
    })
  }

}