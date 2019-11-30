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
 * @prop {*} commitMessage If a function is given, it will be called as `async function(commitManager)`
 * @prop {*} mergeMessage If a function is given, it will be called as `async function(commitManager, pullNumber)`
 * @prop {*} pullRequestTitle If a function is given, it will be called as `async function(commitManager)`
 * @prop {*} pullRequestBody If a function is given, it will be called as `async function(commitManager)`
 * @prop {*} branchPrefix If a function is given, it will be called as `async function(commitManager)`
 * @prop {boolean} autoApprove
 * @prop {boolean} autoRemoveBranch
 * @prop {string} githubTokenInputName
 */

/**
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
   * @type {number}
   */
  pullNumber = null

  /**
   * @constructor
   * @param {Options} [options={}]
   */
  constructor(options = {}) {
    this.options = {
      commitMessage: "Modified repository in GitHub Action",
      mergeMessage: commitManager => `Automatically merged commits from pull #${commitManager.pullNumber}`,
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
   * @return {Promise<void>}
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
    const branchPrefix = await resolveAny(this.options.branchPrefix, this)
    this.branch = `${branchPrefix}${branchId}`
    await exec("git", ["config", "user.email", "action@github.com"])
    await exec("git", ["config", "user.name", "GitHub Action"])
    await exec("git", ["checkout", "-b", this.branch])
  }

  /**
   * @param {string} [commitMessage]
   * @return {Promise<boolean>}
   */
  async commit(commitMessage) {
    const isDirty = await isGitRepoDirty()
    if (!isDirty) {
      return false
    }
    await this.prepare()
    await exec("git", ["add", "--all"])
    let message
    if (commitMessage) {
      message = commitMessage
    } else {
      message = await resolveAny(this.options.commitMessage, this)
    }
    await exec("git", ["commit", "--all", "--message", message])
    this.commits++
    return true
  }

  /**
   * @return {Promise<void>}
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
      title: await resolveAny(this.options.pullRequestTitle, this),
      body: await resolveAny(this.options.pullRequestBody, this),
      head: this.branch,
      base: "master",
    })
    this.pullNumber = pullCreateResult.data.number
    const pullLink = `https://github.com/${process.env.GITHUB_REPOSITORY}/pull/${this.pullNumber}`
    console.log(`Pull with ${zahl(this.commits, "commit")} created: ${chalk.greenBright(pullLink)}`)
    if (!this.options.autoApprove) {
      return
    }
    await octokit.pulls.merge({
      ...context.repo,
      pull_number: this.pullNumber,
      commit_title: await resolveAny(this.options.mergeMessage, this),
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