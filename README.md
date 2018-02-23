![Alt text](docs/images/react-generator-logo-no-type.png)

# ReactGen (generator-react-zeal)

[![npm version](https://img.shields.io/npm/v/generator-react-zeal.svg)](https://www.npmjs.com/package/generator-react-zeal)
[![CircleCI](https://circleci.com/gh/CodingZeal/generator-react-zeal.svg?style=shield&circle-token=62c69a799a2c2a4ad70148f0a4a398b38279ad91)](https://circleci.com/gh/CodingZeal/generator-react-zeal)

Yeoman Generator for [Zeal's](https://codingzeal.com/) React Boilerplate.

## Installation

This is a [yeoman](http://yeoman.io/) generator, so you'll use Yeoman's command-line interface, `yo`, to run the generator.

#### Yarn

```
# Install yo cli, as well as this generator
yarn global add yo generator-react-zeal

# If necessary, create new directory and `cd` into it;
mkdir myApp && cd myApp

# Run the generator
yo react-zeal

# start your app on http://localhost:3000
yarn start
```

#### Npm

```
# Install npm cli, as well as this generator
npm install -g yo generator-react-zeal

# If necessary, create new directory and `cd` into it;
mkdir myApp && cd myApp

# Run the generator
yo react-zeal

# start your app on http://localhost:3000
npm start
```

## Context

ReactGen generates a React project that can be run as a standalone project or embedded inside of a back-end application written in Rails, Phoenix, or some other framework.

Other than a few configuration files, the entire project lives in the `client` directory, making it easy to embed in another application.  The project is structured as a [modular or domain-style Redux application](https://jaysoo.ca/2016/02/28/organizing-redux-application/).

ReactGen pre-configures a number of packages that we find useful in our front-end applications.  After generating your project, feel free to add or remove packages to match your preferences.

These packages include:
- [jest](http://facebook.github.io/jest/) and [enzyme](http://airbnb.io/enzyme/) for testing;
- [eslint](http://eslint.org/) and [sass-lint](https://github.com/sasstools/sass-lint) for linting;
- [redux](http://redux.js.org/);
- [react-router](https://reacttraining.com/react-router/);
- [CSS Modules](https://glenmaddern.com/articles/css-modules) and [SASS](http://sass-lang.com/) for styling; and
- [zeal-redux-utils](https://github.com/CodingZeal/zeal-redux-utils)

ReactGen is built on [@zeal/react-scripts](https://github.com/CodingZeal/create-react-app), our fork of [create-react-app](https://github.com/facebookincubator/create-react-app)'s react-scripts.

## Usage

After generating your application, you can run it using `yarn start` (or `npm start`) and you can develop on `localhost:3000` if you are not in the context of a larger framework.

If you are in the context of a larger framework, you can customize the `APP_PORT` variable in `.env.development` to match the port where the host application runs.  You can then develop in the context of that application instead.

Other provided `yarn`/`npm` scripts include:

- `build`: Create a production-ready client bundle.  By default, the bundle is placed in the `build` folder, but you can change that by setting the `BUILD_PATH` environment variable.

- `validate`: Run all tests and lint checks.

- `test`: Run tests and code coverage.

- `test:watch`: Run the tests every time a file changes.

- `lint`: Run all lint checks (JS and SASS).

- `lint:js`: Run JavaScript lint checks.

- `lint:sass`: Run SASS lint checks.

- `format`: Run prettier to re-format the entire codebase.  This is handy if you don't have an editor integration set up for prettier.

- `eject`: Stop depending on @zeal/react-scripts and include all of its dependencies and configuration directly in your project.  You should only need to do this if you need to customize settings in a way that react-scripts doesn't currently support.

#### Styling

Using CSS Modules and SASS you can import `.scss` files into your components like so:

```js
import styles from './styles.scss'

...

<div className={styles.foo}>...</div>
```

#### Themr

The generator installs by default [React CSS Themr](https://github.com/javivelasco/react-css-themr) which allows the decorating of components with a simple mechanism for easily "theming" the components.

#### Creating a "Themed" Component

Creating a themed component is easy, and builds of the concept of composing css modules.  Apply the decorator to a component on export passing a css module and receiving the incoming theme as props.

```scss
// MyComponent/theme.scss
.myComponent {
  background-color: red
}
```

```javascript
// MyComponent/index.js
import { themr } from 'react-css-themr'

import myComponentTheme from './theme.scss'

function MyComponent({ theme }) {
  return (
    <div className={theme.myComponent}>Hello World</div>
  )
}

export default themr('', myComponentTheme)(MyComponent)
```

In the above example we import the styles object from `theme.scss` and pass it as the second argument to the themr decorator.  Themr will pass that object into our wrapped component as `theme` on the components props.  When this component is used, `theme` can be passed to the component and the information in the incoming style object will be merged with "default" theme.  There are options that can be passed in regards to the approach for merging the themes, and you can read up on them [here](https://github.com/javivelasco/react-css-themr#combining-css-modules).  To illustrate passing a theme override;

```scss
// ParentComponent/theme.scss
.myComponent {
  background-color: blue
}
```

```javascript
// MyComponent/index.js
import { themr } from 'react-css-themr'

import MyComponent from './MyComponent'
import myParentComponentTheme from './theme.scss'

function MyParentComponent({ theme }) {
  return <MyComponent theme={theme} />
}

export default themr('', myParentComponentTheme)(MyParentComponent)
```
Above the parent component is overriding the `background-color` by passing custom theme information to the themed component.  We generally wrap all components in `themr`, which allows for great flexibility in using our components elsewhere in our apps.

***

#### Example Applications

Check out our usage in the context of a Phoenix app - https://github.com/CodingZeal/phoenix-react-apollo-demo


#### Credits

Authored by the Engineering Team of [Coding ZEAL](https://codingzeal.com?utm_source=github)

This is freely distributed under the [MIT license](LICENSE).
