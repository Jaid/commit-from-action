/** @module commit-from-action */

import {getInput} from "@actions/core"

/**
 * @function
 * @param {string} inputKey
 * @param {Object} getInputOptions
 * @returns {boolean} Input value as defined in workflow file
 * @example
 * import commitFromAction from "commit-from-action"
 * const result = commitFromAction("shouldFetchSomething")
 * result === true
 */
export default function (inputKey, getInputOptions) {
  const value = getInput(inputKey, getInputOptions)
  return /^\s*(true|1)\s*$/i.test(value)
}