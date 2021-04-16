/*!
*** commit-from-action 1.3.0
*** Copyright © 2021, Jaid <jaid.jsx@gmail.com> (https://github.com/Jaid)
*** @license MIT
*** See https://github.com/Jaid/commit-from-action
!*/
var t,e;t=global,e=function(){return function(t){var e={};function i(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,i),n.l=!0,n.exports}return i.m=t,i.c=e,i.d=function(t,e,o){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(o,n,function(e){return t[e]}.bind(null,n));return o},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=9)}([function(t,e){t.exports=require("@actions/github")},function(t,e){t.exports=require("@actions/exec")},function(t,e){t.exports=require("resolve-any")},function(t,e){t.exports=require("is-git-repo-dirty")},function(t,e){t.exports=require("@actions/core")},function(t,e){t.exports=require("chalk")},function(t,e){t.exports=require("get-boolean-action-input")},function(t,e){t.exports=require("nanoid")},function(t,e){t.exports=require("zahl")},function(t,e,i){i.r(e),i.d(e,"default",(function(){return y}));var o=i(4),n=i(1),r=i(0),s=i(5),u=i.n(s),a=i(6),c=i.n(a),l=i(3),p=i.n(l),h=i(7),m=i.n(h),b=i(2),f=i.n(b),g=i(8),d=i.n(g);function x(t,e){return void 0===t?e:"string"==typeof t?c()(t):!!t}class y{constructor(t={}){this.commits=0,this.branch=null,this.pullNumber=null,this.isMerged=!1,this.isRemoved=!1,this.options={commitMessage:"Modified repository in GitHub Action",mergeMessage:t=>"Automatically merged commits from pull #"+t.pullNumber,pullRequestTitle:"Automatic changes from GitHub Action",pullRequestBody:"Hewwo!",autoApprove:!0,autoRemoveBranch:!0,githubTokenInputName:"githubToken",branchPrefix:"action-",...t},this.autoApprove=x(this.options.autoApprove,!0),this.autoRemoveBranch=x(this.options.autoRemoveBranch,!0)}async prepare(){if(this.branch)return;let t=r.context.sha?r.context.sha.slice(0,8):m()("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",8);const e=await f()(this.options.branchPrefix,this);this.branch=`${e}${t}`,await Object(n.exec)("git",["config","user.email","action@github.com"]),await Object(n.exec)("git",["config","user.name","GitHub Action"]),await Object(n.exec)("git",["checkout","-b",this.branch])}async commit(t){if(!await p()())return!1;let e;return await this.prepare(),await Object(n.exec)("git",["add","--all"]),e=t||await f()(this.options.commitMessage,this),await Object(n.exec)("git",["commit","--all","--message",e]),this.commits++,!0}async push(){if(await p()()&&await this.commit(),!this.commits)return;this.githubToken=Object(o.getInput)(this.options.githubTokenInputName,{required:!0}),await Object(n.exec)("git",["push",`https://${process.env.GITHUB_ACTOR}:${this.githubToken}@github.com/${process.env.GITHUB_REPOSITORY}.git`,"HEAD:"+this.branch]);const t=new r.GitHub(this.githubToken),e=await t.pulls.create({...r.context.repo,title:await f()(this.options.pullRequestTitle,this),body:await f()(this.options.pullRequestBody,this),head:this.branch,base:"master"});this.pullNumber=e.data.number;const i=`https://github.com/${process.env.GITHUB_REPOSITORY}/pull/${this.pullNumber}`;console.log(`Pull with ${d()(this.commits,"commit")} created: ${u.a.greenBright(i)}`),this.autoApprove&&(await t.pulls.merge({...r.context.repo,pull_number:this.pullNumber,commit_title:await f()(this.options.mergeMessage,this)}),this.isMerged=!0,this.autoRemoveBranch&&(await t.git.deleteRef({...r.context.repo,ref:"heads/"+this.branch}),this.isRemoved=!0))}async finalize(){if(this.pullNumber&&this.autoApprove&&!this.isMerged){console.log(`Automerging failed, pull #${this.pullNumber} will be closed now`);const t=new r.GitHub(this.githubToken);await t.pulls.update({...r.context.repo,pull_number:this.pullNumber,state:"closed"})}}}}])},"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports["commit-from-action"]=e():t.CommitFromAction=e();