# commit-from-action


Utility for making changes to a repository from a GitHub Action.



## API Reference
<a name="module_commit-from-action"></a>

## commit-from-action

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

<a name="exp_module_commit-from-action--module.exports"></a>

### module.exports ⏏
**Kind**: Exported class  
<a name="new_module_commit-from-action--module.exports_new"></a>

#### new module.exports([options])

| Param | Type | Default |
| --- | --- | --- |
| [options] | <code>Options</code> | <code>{}</code> | 

**Example**  
```javascript
import CommitManager from "commit-from-action"
const commitManager = new CommitManager
```
<a name="module_commit-from-action--module.exports+commits"></a>

#### module.exports.commits : <code>number</code>
**Kind**: instance property of [<code>module.exports</code>](#exp_module_commit-from-action--module.exports)  
<a name="module_commit-from-action--module.exports+branch"></a>

#### module.exports.branch : <code>string</code>
**Kind**: instance property of [<code>module.exports</code>](#exp_module_commit-from-action--module.exports)  
<a name="module_commit-from-action--module.exports+pullNumber"></a>

#### module.exports.pullNumber : <code>number</code>
**Kind**: instance property of [<code>module.exports</code>](#exp_module_commit-from-action--module.exports)  
<a name="module_commit-from-action--module.exports+isMerged"></a>

#### module.exports.isMerged : <code>boolean</code>
**Kind**: instance property of [<code>module.exports</code>](#exp_module_commit-from-action--module.exports)  
<a name="module_commit-from-action--module.exports+isRemoved"></a>

#### module.exports.isRemoved : <code>boolean</code>
**Kind**: instance property of [<code>module.exports</code>](#exp_module_commit-from-action--module.exports)  
<a name="module_commit-from-action--module.exports+prepare"></a>

#### module.exports.prepare() ⇒ <code>Promise.&lt;void&gt;</code>
**Kind**: instance method of [<code>module.exports</code>](#exp_module_commit-from-action--module.exports)  
<a name="module_commit-from-action--module.exports+commit"></a>

#### module.exports.commit([commitMessage]) ⇒ <code>Promise.&lt;boolean&gt;</code>
**Kind**: instance method of [<code>module.exports</code>](#exp_module_commit-from-action--module.exports)  

| Param | Type |
| --- | --- |
| [commitMessage] | <code>string</code> | 

<a name="module_commit-from-action--module.exports+push"></a>

#### module.exports.push() ⇒ <code>Promise.&lt;void&gt;</code>
**Kind**: instance method of [<code>module.exports</code>](#exp_module_commit-from-action--module.exports)  
<a name="module_commit-from-action--module.exports..Options"></a>

#### module.exports~Options : <code>Object</code>
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


