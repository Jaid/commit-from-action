import CommitManager from "commit-from-action"
import {writeFile} from "fs/promises"

await writeFile("abc.txt", "abc")

const commitManager = new CommitManager
await commitManager.commit("Added file abc.txt")
await commitManager.push()
await commitManager.finalize() // Does some cleaning