# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased](https://github.com/CodingZeal/generator-react-zeal/compare/v0.4.0...HEAD)

## [0.4.0](https://github.com/CodingZeal/generator-react-zeal/compare/v0.3.1...v0.4.0) - 2017-05-16

### Changed

- Upgrade to React 15.5.4.  React 15.5.x adds [several new deprecation warnings](https://facebook.github.io/react/blog/2017/04/07/react-v15.5.0.html#new-deprecation-warnings).  Most of our dependencies have been updated to eliminate these, but not all of them.  Specifically, react-toolbox and react-css-themr still cause these warnings to appear.  While we prefer not to have any warnings in our apps, we'd rather be on the latest version of React, so we've decided to live with the warnings for now.  We will update these dependencies as soon as we can once they've addressed these issues. ([#55](https://github.com/CodingZeal/generator-react-zeal/pull/55))

- Upgrade to react-apollo 1.2.0.  This version re-exports apollo-client and graphql-tag so host projects no longer need to depend on those packages.  This involves a minor change to the import in `client/base/apolloClient.js`. ([#55](https://github.com/CodingZeal/generator-react-zeal/pull/55))

- Upgrade to Zeal's fork of react-scripts (v0.2.3).  This version is based on create-react-app v0.9.5. ([#53](https://github.com/CodingZeal/generator-react-zeal/pull/53), [#54](https://github.com/CodingZeal/generator-react-zeal/pull/54), [#63](https://github.com/CodingZeal/generator-react-zeal/pull/63))

- We've moved eslint and its plugins and configuration into the react-scripts fork.  This means that everywhere eslint runs, it uses the same configuration and there is no duplication between react-scripts and the host project.  This includes from the yarn script (`yarn lint:js`), from text editor integration, and from `yarn start`.  We use [eslint-config-zeal](https://github.com/CodingZeal/eslint-config-zeal) as a base configuration.  Our fork of react-scripts doesn't provide its own eslint configuration; rather it looks in the host project for its configuration, which this generator provides.  This allows the host project to override rule configurations locally.  **NOTE:** The current design of this feature doesn't allow a host project to add new eslint plugins.  We do not yet have a fix for this issue, but if this is important to you, see [#60](https://github.com/CodingZeal/generator-react-zeal/issues/60). ([#54](https://github.com/CodingZeal/generator-react-zeal/pull/54))

- The eslint configuration now uses an absolute path to the `client` directory when resolving imports.  Previously, we used a relative path which doesn't work with Atom's linter-eslint plugin.  The workaround we used before was to add an empty `.eslintignore` file in the root of the project, but using an absolute path is a more correct solution. ([#61](https://github.com/CodingZeal/generator-react-zeal/pull/61))

- We've renamed the yarn scripts for running tests to be more consistent with our other projects.  Now `yarn test` will run the tests one time, report coverage information, and exit.  `yarn test:watch` will start Jest in watch mode and continuously run the tests as files are changed. ([#52](https://github.com/CodingZeal/generator-react-zeal/pull/52))

- Minor upgrades to several packages in generated projects: babel-polyfill 6.23.0, enzyme 2.8.2, history 4.6.1, npm-run-all 4.0.2, react-css-themr 2.0.0, react-redux 5.0.4, redux-devtools-extension 2.13.2, and zeal-redux-utils 0.3.2. ([#55](https://github.com/CodingZeal/generator-react-zeal/pull/55))

### Added

- Include `yarn.lock` in generated projects.  This means that newly-generated projects will use the exact same versions of our dependencies that we've tested. ([#49](https://github.com/CodingZeal/generator-react-zeal/pull/49))

- The generator now runs `yarn install` after generating the project.  This saves a step and results in a client application that is ready to run. ([#58](https://github.com/CodingZeal/generator-react-zeal/pull/58))

- Include a test-specific eslint configuration file in the `__test__` directory.  Unfortunately, every new `__test__` directory needs a copy of the same file, but this allows us to customize a few lint rules for tests (using [eslint-config-zeal](https://github.com/CodingZeal/eslint-config-zeal)'s `jest` configuration). ([#54](https://github.com/CodingZeal/generator-react-zeal/pull/54))

### Fixed

- The `createReducer` function provided by [zeal-redux-utils](https://github.com/CodingZeal/zeal-redux-utils) raises an error when it encounters a Redux action that doesn't conform to the [flux-standard-action](https://github.com/acdlite/flux-standard-action) specification.  Unfortunately, Apollo's actions do not conform and so were triggering this exception.  We've added a local version of `createReducer` that provides a whitelist function to bypass this check for Apollo's actions. ([#55](https://github.com/CodingZeal/generator-react-zeal/pull/55))

### Removed

- Remove some dependencies that were no longer being used: immutability-helper and normalize.css. ([#55](https://github.com/CodingZeal/generator-react-zeal/pull/55))

### Internal

- Upgraded a few packages that are only used internally: yeoman-generator 1.1.1, yeoman-assert 3.0.0, and jest 20.0.1. ([#29](https://github.com/CodingZeal/generator-react-zeal/pull/29), [#36](https://github.com/CodingZeal/generator-react-zeal/pull/36), [#51](https://github.com/CodingZeal/generator-react-zeal/pull/51))

## [0.3.1](https://github.com/CodingZeal/generator-react-zeal/compare/v0.3.0...v0.3.1) - 2017-04-12

### Fixed
- Added Material Icons to template (dependency of react-toolbox) ([#42](https://github.com/CodingZeal/generator-react-zeal/pull/42))
- Added Roboto font to template (dependency of react-toolbox) ([#43](https://github.com/CodingZeal/generator-react-zeal/pull/43))

## [0.3.0](https://github.com/CodingZeal/generator-react-zeal/compare/v0.2.0...v0.2.1) - 2017-02-20

### Changed
- Update to React Router 4 beta ([#31](https://github.com/CodingZeal/generator-react-zeal/pull/31))

## [0.2.0](https://github.com/CodingZeal/generator-react-zeal/compare/v0.1.9...v0.2.0) - 2017-01-20

### Added
- documentation for react-toolbox ([#12](https://github.com/CodingZeal/generator-react-zeal/pull/12))
- documentation for themr ([#13](https://github.com/CodingZeal/generator-react-zeal/pull/13))
- reference to [Phoenix React Apollo Demo](https://github.com/CodingZeal/phoenix-react-apollo-demo) ([#16](https://github.com/CodingZeal/generator-react-zeal/pull/16))
- LICENSE ([#17](https://github.com/CodingZeal/generator-react-zeal/pull/17))
- this CHANGELOG ([#21](https://github.com/CodingZeal/generator-react-zeal/pull/21))

### Changed
- update template dependencies ([#20](https://github.com/CodingZeal/generator-react-zeal/pull/20))
- yarn usage ([#18](https://github.com/CodingZeal/generator-react-zeal/pull/18))
- update jest to 18.1.0 ([#9](https://github.com/CodingZeal/generator-react-zeal/pull/9))
- update yeoman-generator and yeoman-assert ([#14](https://github.com/CodingZeal/generator-react-zeal/pull/14))
