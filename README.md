# generator-react-zeal

Yeoman generator for Zeal's React boilerplate

Expected to be used in the root of a Rails or Phoenix project configured with
the Zeal client app strategy.

[![npm version](https://img.shields.io/npm/v/generator-react-zeal.svg)](https://www.npmjs.com/package/generator-react-zeal)
[![CircleCI](https://circleci.com/gh/CodingZeal/generator-react-zeal.svg?style=shield&circle-token=62c69a799a2c2a4ad70148f0a4a398b38279ad91)](https://circleci.com/gh/CodingZeal/generator-react-zeal)


## Installation

```
npm install -g yo generator-react-zeal
```

## Usage

```
yo react-zeal
```

## Context

This generator has a devDependency of [@zeal/react-scripts](https://github.com/CodingZeal/create-react-app) which is a fork of the "react CLI" from facebook.  This fork marches closely in step with facebook's version with some differences in configuration.  These changes support some more advanced webpack features as well as plug-and-play with frameworks like Rails and Phoenix.  

The features we have added support for include:

- CSS Modules
- SASS

Thus you can import .scss files into your components like so

``` javascript
import styles from './styles.scss'

...

<div className={styles.foo}>...</div>
```

In order to better support usage inside Rails etc we have moved the public directory inside the client directory.  Thus the frameworks' root will not be cluttered with anything other than the client directory.  The generated app will run with `npm start` and you can still develop on `localhost:3000` if you are not in the context of a larger framework.
