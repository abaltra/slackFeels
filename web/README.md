# website.com

a [Sails](http://sailsjs.org) application

# Requirements
 * NodeJS
 * [SailsJS](https://github.com/balderdashy/sails) (mvc framework)
 * AngularJS
 * MongoDB (storage)
 * Redis (session management)

# Install
```
git clone [repo]
npm install
bower install
```
**!! copy config/local.sample.js to config/local.js and edit with your local settings !!**

# Running
```
gulp server
```
## Contributing ##
**NEVER commit to staging branch. Always merge from dev in to staging and then push.**
```bash
$ git checkout development
$ git pull origin development
$ git checkout -b new-branch
# note "new-branch" is usually "feature/feature-name" or "hotfix/fix-name"

# now start doing changes, git commit, etc.

# done changes, again grab latest code copy
$ git checkout development
$ git pull origin development

# replay your changes, starting from latest development
# this way you won't override others' changes
$ git checkout new-branch
$ git rebase development
# resolve conflicts, there shouldn't be many!

# okay, it's clean. create a Pull Request (PR) with development as base.
# others developers will comment on your PR. once everything is OK, they will merge your PR and delete your branch
```

# Staging
Staging is deployed manually by pushing to the `staging` branch and hosted at https://staging.website.com.

**NEVER commit to `staging` branch. Always merge from `dev` in to `staging` and then push.**

When `development` is up-to-date locally:
```
git checkout staging
git merge development
git push origin staging
```
# Production
Production is deployed manually by pushing to the `master` branch and hosted at https://www.website.com.

**NEVER commit to `master` branch. Always merge from `staging` in to `master` and then push.**

When `staging` is up-to-date locally:
```
git checkout master
git merge staging
git push origin master
```

# Coding style
Indentation: Spaces
Spacing: 2 Spaces
Readability: Normal
Blocks: Inline
Variables Naming: Normal
Variables Case: lower_case
Functions Naming: Normal
Functions Case: lower_case
Comma in Variable Declaration: Trailing Comma
Concatenation: Leading
Quotes: Single
Semicolons: Yes
Variable Declaration: Once
Require Brackets: Always

[![jsCode.org - JavaScript Coding Guidelines](https://img.shields.io/badge/jscode-mini-blue.svg?style=flat)](http://jscode.org/mini)
