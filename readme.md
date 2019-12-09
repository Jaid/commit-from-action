# commit-from-action


Utility for making changes to a repository from a GitHub Action.

## Installation
<a href='https://npmjs.com/package/commit-from-action'><img alt='npm logo' src='https://github.com/Jaid/action-readme/raw/master/images/base-assets/npm.png'/></a>
```bash
npm install --save commit-from-action@^1.2.0
```
<a href='https://yarnpkg.com/package/commit-from-action'><img alt='Yarn logo' src='https://github.com/Jaid/action-readme/raw/master/images/base-assets/yarn.png'/></a>
```bash
yarn add commit-from-action@^1.2.0
```



## Documentation

* [commit-from-action](#module_commit-from-action)
    * [module.exports](#exp_module_commit-from-action--module.exports) ⏏
        * [new module.exports([options])](#new_module_commit-from-action--module.exports_new)
        * _instance_
            * [.commits](#module_commit-from-action--module.exports+commits) : <code>number</code>
            * [.branch](#module_commit-from-action--module.exports+branch) : <code>string</code>
            * [.pullNumber](#module_commit-from-action--module.exports+pullNumber) : <code>number</code>
            * [.isMerged](#module_commit-from-action--module.exports+isMerged) : <code>boolean</code>
            * [.isRemoved](#module_commit-from-action--module.exports+isRemoved) : <code>boolean</code>
            * [.prepare()](#module_commit-from-action--module.exports+prepare) ⇒ <code>Promise.&lt;void&gt;</code>
            * [.commit([commitMessage])](#module_commit-from-action--module.exports+commit) ⇒ <code>Promise.&lt;boolean&gt;</code>
            * [.push()](#module_commit-from-action--module.exports+push) ⇒ <code>Promise.&lt;void&gt;</code>
        * _inner_
            * [~Options](#module_commit-from-action--module.exports..Options) : <code>Object</code>

**Kind**: Exported class  

| Param | Type | Default |
| --- | --- | --- |
| [options] | <code>Options</code> | <code>{}</code> | 

**Example**  
```javascript
import CommitManager from "commit-from-action"
const commitManager = new CommitManager
```
**Kind**: instance property of [<code>module.exports</code>](#exp_module_commit-from-action--module.exports)  
**Kind**: instance property of [<code>module.exports</code>](#exp_module_commit-from-action--module.exports)  
**Kind**: instance property of [<code>module.exports</code>](#exp_module_commit-from-action--module.exports)  
**Kind**: instance property of [<code>module.exports</code>](#exp_module_commit-from-action--module.exports)  
**Kind**: instance property of [<code>module.exports</code>](#exp_module_commit-from-action--module.exports)  
**Kind**: instance method of [<code>module.exports</code>](#exp_module_commit-from-action--module.exports)  
**Kind**: instance method of [<code>module.exports</code>](#exp_module_commit-from-action--module.exports)  

| Param | Type |
| --- | --- |
| [commitMessage] | <code>string</code> | 

**Kind**: instance method of [<code>module.exports</code>](#exp_module_commit-from-action--module.exports)  
**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_commit-from-action--module.exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| commitMessage | <code>\*</code> | If a function is given, it will be called as `async function(commitManager)` |
| mergeMessage | <code>\*</code> | If a function is given, it will be called as `async function(commitManager, pullNumber)` |
| pullRequestTitle | <code>\*</code> | If a function is given, it will be called as `async function(commitManager)` |
| pullRequestBody | <code>\*</code> | If a function is given, it will be called as `async function(commitManager)` |
| branchPrefix | <code>\*</code> | If a function is given, it will be called as `async function(commitManager)` |
| autoApprove | <code>boolean</code> |  |
| autoRemoveBranch | <code>boolean</code> |  |
| githubTokenInputName | <code>string</code> |  |



## License
```text
MIT License

Copyright © 2019, Jaid <jaid.jsx@gmail.com> (github.com/jaid)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
