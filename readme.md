# commit-from-action


<a href="https://raw.githubusercontent.com/jaid/commit-from-action/master/license.txt"><img src="https://img.shields.io/github/license/jaid/commit-from-action?style=flat-square" alt="License"/></a> <a href="https://github.com/sponsors/jaid"><img src="https://img.shields.io/badge/<3-Sponsor-FF45F1?style=flat-square" alt="Sponsor commit-from-action"/></a>  
<a href="https://actions-badge.atrox.dev/jaid/commit-from-action/goto"><img src="https://img.shields.io/endpoint.svg?style=flat-square&url=https%3A%2F%2Factions-badge.atrox.dev%2Fjaid%2Fcommit-from-action%2Fbadge" alt="Build status"/></a> <a href="https://github.com/jaid/commit-from-action/commits"><img src="https://img.shields.io/github/commits-since/jaid/commit-from-action/v1.4.0?style=flat-square&logo=github" alt="Commits since v1.4.0"/></a> <a href="https://github.com/jaid/commit-from-action/commits"><img src="https://img.shields.io/github/last-commit/jaid/commit-from-action?style=flat-square&logo=github" alt="Last commit"/></a> <a href="https://github.com/jaid/commit-from-action/issues"><img src="https://img.shields.io/github/issues/jaid/commit-from-action?style=flat-square&logo=github" alt="Issues"/></a>  
<a href="https://npmjs.com/package/commit-from-action"><img src="https://img.shields.io/npm/v/commit-from-action?style=flat-square&logo=npm&label=latest%20version" alt="Latest version on npm"/></a> <a href="https://github.com/jaid/commit-from-action/network/dependents"><img src="https://img.shields.io/librariesio/dependents/npm/commit-from-action?style=flat-square&logo=npm" alt="Dependents"/></a> <a href="https://npmjs.com/package/commit-from-action"><img src="https://img.shields.io/npm/dm/commit-from-action?style=flat-square&logo=npm" alt="Downloads"/></a>

**Utility class for making changes to a repository from a GitHub Action.**





## Installation

<a href="https://npmjs.com/package/commit-from-action"><img src="https://img.shields.io/badge/npm-commit--from--action-C23039?style=flat-square&logo=npm" alt="commit-from-action on npm"/></a>

```bash
npm install --save commit-from-action@^1.4.0
```

<a href="https://yarnpkg.com/package/commit-from-action"><img src="https://img.shields.io/badge/Yarn-commit--from--action-2F8CB7?style=flat-square&logo=yarn&logoColor=white" alt="commit-from-action on Yarn"/></a>

```bash
yarn add commit-from-action@^1.4.0
```



## Example


```javascript
import CommitManager from "commit-from-action"
import {writeFile} from "fs/promises"

await writeFile("abc.txt", "abc")

const commitManager = new CommitManager
await commitManager.commit("Added file abc.txt")
await commitManager.push()
await commitManager.finalize() // Does some cleaning
```




















## Development



Setting up:
```bash
git clone git@github.com:jaid/commit-from-action.git
cd commit-from-action
npm install
```
Testing in production environment:
```bash
npm run test
```


## License
[MIT License](https://raw.githubusercontent.com/jaid/commit-from-action/master/license.txt)  
Copyright © 2021, Jaid \<jaid.jsx@gmail.com> (https://github.com/jaid)

<!---
Readme generated with tldw v7.0.0
https://github.com/Jaid/tldw
-->