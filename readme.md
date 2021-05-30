# commit-from-action


<a href="https://raw.githubusercontent.com/jaid/commit-from-action/master/license.txt"><img src="https://img.shields.io/github/license/jaid/commit-from-action?style=flat-square" alt="License"/></a> <a href="https://github.com/sponsors/jaid"><img src="https://img.shields.io/badge/<3-Sponsor-FF45F1?style=flat-square" alt="Sponsor commit-from-action"/></a>  
<a href="https://actions-badge.atrox.dev/jaid/commit-from-action/goto"><img src="https://img.shields.io/endpoint.svg?style=flat-square&url=https%3A%2F%2Factions-badge.atrox.dev%2Fjaid%2Fcommit-from-action%2Fbadge" alt="Build status"/></a> <a href="https://github.com/jaid/commit-from-action/commits"><img src="https://img.shields.io/github/commits-since/jaid/commit-from-action/v2.0.3?style=flat-square&logo=github" alt="Commits since v2.0.3"/></a> <a href="https://github.com/jaid/commit-from-action/commits"><img src="https://img.shields.io/github/last-commit/jaid/commit-from-action?style=flat-square&logo=github" alt="Last commit"/></a> <a href="https://github.com/jaid/commit-from-action/issues"><img src="https://img.shields.io/github/issues/jaid/commit-from-action?style=flat-square&logo=github" alt="Issues"/></a>  
<a href="https://npmjs.com/package/commit-from-action"><img src="https://img.shields.io/npm/v/commit-from-action?style=flat-square&logo=npm&label=latest%20version" alt="Latest version on npm"/></a> <a href="https://github.com/jaid/commit-from-action/network/dependents"><img src="https://img.shields.io/librariesio/dependents/npm/commit-from-action?style=flat-square&logo=npm" alt="Dependents"/></a> <a href="https://npmjs.com/package/commit-from-action"><img src="https://img.shields.io/npm/dm/commit-from-action?style=flat-square&logo=npm" alt="Downloads"/></a>

**Utility class for making changes to a repository from a GitHub Action.**





## Installation

<a href="https://npmjs.com/package/commit-from-action"><img src="https://img.shields.io/badge/npm-commit--from--action-C23039?style=flat-square&logo=npm" alt="commit-from-action on npm"/></a>

```bash
npm install --save commit-from-action@^2.0.3
```

<a href="https://yarnpkg.com/package/commit-from-action"><img src="https://img.shields.io/badge/Yarn-commit--from--action-2F8CB7?style=flat-square&logo=yarn&logoColor=white" alt="commit-from-action on Yarn"/></a>

```bash
yarn add commit-from-action@^2.0.3
```



## Example


```javascript
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
```







## Options



<table>
<tr>
<th></th>
<th>Type</th>
<th>Default</th>
<th>Info</th>
</tr>
<tr>
<td>autoApprove</td>
<td>boolean</td>
<td>true</td>
<td>If true, the created pull request will be automatically approved and merged.</td>
</tr>
<tr>
<td>autoRemoveBranch</td>
<td>boolean</td>
<td>true</td>
<td>If true, the created branch will be automatically deleted. Good for avoiding mess.</td>
</tr>
<tr>
<td>branch</td>
<td>string</td>
<td>randomly generated</td>
<td>Name of the temporary branch. If this is explicitly set, option `branchPrefix` is ignored.</td>
</tr>
<tr>
<td>branchPrefix</td>
<td>string</td>
<td>"action-"</td>
<td>Starting string of the temporary branch's name. The rest of it will be randomly generated.</td>
</tr>
<tr>
<td>commitMessage</td>
<td>string</td>
<td>"Modified repository in GitHub Action"</td>
<td>Default commit message to use, if commitManager.commit() is called without an argument.</td>
</tr>
<tr>
<td>githubTokenInputName</td>
<td>string</td>
<td>"githubToken"</td>
<td>The key of your action's input that passes the user's GitHub token.</td>
</tr>
<tr>
<td>ignoreFiles</td>
<td>string[]</td>
<td>[]</td>
<td>List of globs of files not to commit.</td>
</tr>
<tr>
<td>mergeMessage</td>
<td>string</td>
<td>"Automatically merged commits from pull {pullNumber}"</td>
<td>Commit message of the pull request's merge.</td>
</tr>
<tr>
<td>pullRequestBody</td>
<td>string</td>
<td>"Hewwo!"</td>
<td>Description of the automatically created pull request.</td>
</tr>
<tr>
<td>pullRequestTitle</td>
<td>string</td>
<td>"Automatic changes from GitHub Action"</td>
<td>Title of the automatically created pull request.</td>
</tr>
</table>













## Development



Setting up:
```bash
git clone git@github.com:jaid/commit-from-action.git
cd commit-from-action
npm install
```


## License
[MIT License](https://raw.githubusercontent.com/jaid/commit-from-action/master/license.txt)  
Copyright © 2021, Jaid \<jaid.jsx@gmail.com> (https://github.com/jaid)

<!---
Readme generated with tldw v7.0.0
https://github.com/Jaid/tldw
-->