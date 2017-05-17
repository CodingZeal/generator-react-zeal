# ReactGen (generator-react-zeal)

Yeoman Generator for [Zeal's](https://codingzeal.com/) React Boilerplate.

[![npm version](https://img.shields.io/npm/v/generator-react-zeal.svg)](https://www.npmjs.com/package/generator-react-zeal)
[![CircleCI](https://circleci.com/gh/CodingZeal/generator-react-zeal.svg?style=shield&circle-token=62c69a799a2c2a4ad70148f0a4a398b38279ad91)](https://circleci.com/gh/CodingZeal/generator-react-zeal)

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
- [react-toolbox](http://react-toolbox.com/);
- [CSS Modules](https://glenmaddern.com/articles/css-modules) and [SASS](http://sass-lang.com/) for styling; and
- [zeal-redux-utils](https://github.com/CodingZeal/zeal-redux-utils)

ReactGen is built on [@zeal/react-scripts](https://github.com/CodingZeal/create-react-app), our fork of [create-react-app](https://github.com/facebookincubator/create-react-app)'s react-scripts.

## Usage

After generating your application, you can run it using `yarn start` (or `npm start`) and you can develop on `localhost:3000` if you are not in the context of a larger framework.

Other provided `yarn`/`npm` scripts include:

- `build`: Create a production-ready client bundle.  By default, the bundle is placed in the `build` folder, but you can change that by setting the `BUILD_PATH` environment variable.

- `validate`: Run all tests and lint checks.

- `test`: Run tests and code coverage.

- `test:watch`: Run the tests every time a file changes.

- `lint`: Run all lint checks (JS and SASS).

- `lint:js`: Run JavaScript lint checks.

- `lint:sass`: Run SASS lint checks.

- `eject`: Stop depending on @zeal/react-scripts and include all of its dependencies and configuration directly in your project.  You should only need to do this if you need to customize settings in a way that react-scripts doesn't currently support.

#### Styling

Using CSS Modules and SASS you can import `.scss` files into your components like so:

```js
import styles from './styles.scss'

...

<div className={styles.foo}>...</div>
```

#### React Toolbox

The generator installs by default [React Toolbox](http://react-toolbox.com/) which is a set of Material Design components.  At Zeal we have found this project to be an excellent starting point for many common UI patterns.  You can of-course ignore it and or remove it from the generated app if you are so inclined.

#### Using Customizable React Toolbox Components

To make for the most flexibility when dealing with React Toolbox we recommend following the pattern of manually adding and exporting the desired components theme.  Then instead of importing the pre-themed component from `react-toolbox`, import the un-themed version.  Don't worry, if you have exported the theme manually it will still have the default theme, and now you will have more flexibility in terms of overriding theme defaults.  

For example you would like to use the button component from `react-toolbox` and would like to override the default primary color.  You will want to import / export that button's theme from `react-toolbox` along with a hook for your customization.

In the `client/styles/react-toolbox` directory create a new file called `button.scss`.   In `button.scss` first import your apps global styles;

```scss
@import '~/styles/globals';
```
Then import the the buttons theme from `react-toolbox`;
```scss
@import '~/styles/globals';
@import '~react-toolbox/lib/button/theme';
```
Lastly in `client/styles/react-toolbox/index.js` export your custom theme file.
```javascript
export RTButton from './button.scss'
```
This allows the apps `ThemeProvider` context to pass this information to react-toolbox.  By default we follow this pattern for `ProgressBar` as an example.

Great, you now have hooked into the theme provider.  Now you just have to import the _un-themed_ version of the component from react-toolbox and let the theme provider do the rest.

In your component import like this;

```javascript
import Button from 'react-toolbox/lib/button/Button'
```
It is important ***_not to import the themed_*** version from react toolbox otherwise your hard work to allow for greater flexibility will be lost, for example if you did this...

```javascript
import { Button, IconButton } from 'react-toolbox/lib/button'
```

The button would not be affected by the apps theme provider.

Once you have imported the Button component that will respond to the theme provider, you can set the $color-primary in several different ways depending on your needs.  Generally `$color-primary` will be inherited from the react-toolbox default configuration.  You can override it globally in `client/styles/_globals.scss` which will make all react-toolbox components use that configuration for `$color-primary`.  You can see in the generated app we have set the `$color-primary` to the `$zeal-orange` color defined in the `_colors.scss` file.  If however you would like to override that color for a specific component, we recommend creating a new component that imports the button, applies a custom theme, and then exports the button for the rest of the app to use.

#### Style Dependencies

Many of the React Toolbox components have styles which depend on other components from React Toolbox having their styles present.  For example some of the react components have an option for the 'ripple' effect.  So, if you would like to set that property on a list item or a button etc, you should be sure to import / export the ripple theme as described above.

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
