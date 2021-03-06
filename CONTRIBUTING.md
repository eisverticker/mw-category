# Contributing to mw-category

Feel free to contribute to this project by creating a pull request on GitHub.

Commits should be well structured, which means that a single commit must not contain multiple concerns. Take a look at the the commit guidelines below.

Also make sure to update _jsdoc_ when making api changes and to run _eslint_ after code changes.

## Commit Messages

[Inspired by Angular Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md)

```plain
<type>: <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Subject must be written in imperative style eg:

* `docs: update README`
* `feat: add some nice feature`
* `refactor: rename FooBar to BarFoo`
* `style: apply code conventions to foo.js`
* `test: add unit test`

### Type

Must be one of the following:

* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **ci**: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **test**: Adding missing tests or correcting existing tests
* **chore**: generic type to indicate technical changes without business value
