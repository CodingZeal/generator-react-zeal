### Yeoman Generator for [Zeal's](https://codingzeal.com/) React Boilerplate
[![npm version](https://img.shields.io/npm/v/generator-react-zeal.svg)](https://www.npmjs.com/package/generator-react-zeal)
[![CircleCI](https://circleci.com/gh/CodingZeal/generator-react-zeal.svg?style=shield&circle-token=62c69a799a2c2a4ad70148f0a4a398b38279ad91)](https://circleci.com/gh/CodingZeal/generator-react-zeal)

This generator can be used with `yarn` or `npm`. `generator-react-zeal` is a [yeoman](http://yeoman.io/) generator and follows the usage pattern commonly found with the yo cli.

***

#### Yarn
```
# Install yo cli, as well as this generator
yarn global add yo generator-react-zeal

# If necessary, create new directory and `cd` into it
mkdir myApp && cd myApp

# Run the generator
yo react-zeal

# Install
yarn

# start your app on http://localhost:3000
yarn start
```
#### Npm
```
# Install npm cli, as well as this generator
npm install -g yo generator-react-zeal

# If necessary, create new directory and `cd` into it
mkdir myApp && cd myApp

# Run the generator
yo react-zeal

# Install
npm install

# start your app on http://localhost:3000
npm start
```

***

#### Context

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

In order to better support usage inside Rails etc we have moved the public directory inside the client directory.  Thus the frameworks' root will not be cluttered with anything other than the client directory.  The generated app will run with `yarn start` (or `npm start`) and you can still develop on `localhost:3000` if you are not in the context of a larger framework.

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

Checkout our usage in the context of Phoenix app - https://github.com/CodingZeal/phoenix-react-apollo-demo


#### Credits

Authored by the Engineering Team of [Coding ZEAL](https://codingzeal.com?utm_source=github)

This is freely distributed under the [MIT license](LICENSE).
