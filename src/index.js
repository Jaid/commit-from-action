/** @module commit-from-action */

import {getInput} from "@actions/core"
import {exec} from "@actions/exec"
import {context, GitHub} from "@actions/github"
import chalk from "chalk"
import getBooleanActionInput from "get-boolean-action-input"
import isGitRepoDirty from "is-git-repo-dirty"
import resolveAny from "resolve-any"
import zahl from "zahl"

import generateBranchName from "lib/generateBranchName"

/**
 * @typedef {Object} Options
 * @prop {*} commitMessage If a function is given, it will be called as `async function(commitManager)`
 * @prop {*} mergeMessage If a function is given, it will be called as `async function(commitManager, pullNumber)`
 * @prop {*} pullRequestTitle If a function is given, it will be called as `async function(commitManager)`
 * @prop {*} pullRequestBody If a function is given, it will be called as `async function(commitManager)`
 * @prop {*} branch If a function is given, it will be called as `async function(commitManager)`
 * @prop {*} branchPrefix If a function is given, it will be called as `async function(commitManager)`
 * @prop {boolean|string} autoApprove
 * @prop {boolean|string} autoRemoveBranch
 * @prop {string} githubTokenInputName
 * @prop {string[]} [ignoreFiles = []]
 */

/**
  * @param {string|boolean} value
  * @param {boolean} defaultValue
  * @return {boolean}
  */
function getBooleanValue(value, defaultValue) {
  if (value === undefined) {
    return defaultValue
  }
  if (typeof value === "string") {
    return getBooleanActionInput(value)
  }
  return Boolean(value)
}

/**
 * @example
 * import CommitManager from "commit-from-action"
 * const commitManager = new CommitManager
 */
export default class CommitManager {

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
   * @type {boolean}
   */
  isMerged = false

  /**
   * @type {boolean}
   */
  isRemoved = false

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
      ignoreFiles: [],
      ...options,
    }
    this.autoApprove = getBooleanValue(this.options.autoApprove, true)
    this.autoRemoveBranch = getBooleanValue(this.options.autoRemoveBranch, true)
  }

  /**
   * @return {Promise<void>}
   */
  async prepare() {
    if (this.branch) {
      return
    }
    if (this.options.branch) {
      this.branch = await resolveAny(this.options.branch, this)
    } else {
      const branchPrefix = await resolveAny(this.options.branchPrefix, this)
      const branch = generateBranchName(branchPrefix)
      this.branch = branch
    }
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
    const addCommandArguments = ["add", "--all"]
    // git add all, but ignore specific globs https://stackoverflow.com/a/51914162/15443125
    if (this.options.ignoreFiles.length) {
      addCommandArguments.push("--")
      for (const ignoreEntry of this.options.ignoreFiles) {
        addCommandArguments.push(`:!${ignoreEntry}`)
      }
    }
    await exec("git", addCommandArguments)
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
   * @param {import("@actions/github").GitHub} octokit
   * @return {Promise<*>}
   */
  async findOrCreatePullRequest(octokit) {
    const pullsListResult = await octokit.pulls.list({
      ...context.repo,
      head: `${context.repo.owner}:${this.branch}`,
    })
    const existingPullRequest = pullsListResult.data[0]
    if (existingPullRequest) {
      return existingPullRequest
    }
    const pullRequest = await octokit.pulls.create({
      ...context.repo,
      title: await resolveAny(this.options.pullRequestTitle, this),
      body: await resolveAny(this.options.pullRequestBody, this),
      head: this.branch,
      base: "master",
    })
    return pullRequest.data
  }

  /**
   * @return {Promise<void>}
   */
  async push() {
    const isDirty = await isGitRepoDirty()
    if (isDirty) {
      await this.commit()
    }
    if (!this.commits) {
      return
    }
    this.githubToken = getInput(this.options.githubTokenInputName, {required: true})
    await exec("git", ["push", "--force", `https://${process.env.GITHUB_ACTOR}:${this.githubToken}@github.com/${process.env.GITHUB_REPOSITORY}.git`, `HEAD:${this.branch}`])
    const octokit = new GitHub(this.githubToken)
    const pullRequest = await this.findOrCreatePullRequest(octokit)
    this.pullNumber = pullRequest.number
    const pullLink = `https://github.com/${process.env.GITHUB_REPOSITORY}/pull/${this.pullNumber}`
    console.log(`Pull with ${zahl(this.commits, "commit")} created: ${chalk.greenBright(pullLink)}`)
    if (!this.autoApprove) {
      return
    }
    await octokit.pulls.merge({
      ...context.repo,
      pull_number: this.pullNumber,
      commit_title: await resolveAny(this.options.mergeMessage, this),
    })
    this.isMerged = true
    if (!this.autoRemoveBranch) {
      return
    }
    await octokit.git.deleteRef({
      ...context.repo,
      ref: `heads/${this.branch}`,
    })
    this.isRemoved = true
  }

  async finalize() {
    if (!this.pullNumber) {
      return // Pull request does not exist, nothing to clean
    }
    if (this.autoApprove && !this.isMerged) {
      console.log(`Automerging failed, pull #${this.pullNumber} will be closed now`)
      const octokit = new GitHub(this.githubToken)
      await octokit.pulls.update({
        ...context.repo,
        pull_number: this.pullNumber,
        state: "closed",
      })
    }
  }

}