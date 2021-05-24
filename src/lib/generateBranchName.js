import {customAlphabet} from "nanoid"

const idLength = 8
const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", idLength)

/**
 * @function
 * @param {string} prefix
 * @return {string}
 */
export default prefix => {
  const generatedId = nanoid()
  if (prefix) {
    return prefix + generatedId
  } else {
    return generatedId
  }
}