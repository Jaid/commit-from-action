import CommitManager from "commit-from-action"
import {writeFile} from "fs/promises"

await writeFile("abc.txt", "abc")

const commitManager = new CommitManager
try {
  await commitManager.commit("Added file abc.txt")
  await commitManager.push()
} catch (error) {
  console.error(error)
} finally {
  // Does some cleaning, should be called regardless of whether commit and push are successful or not.
  await commitManager.finalize()
}