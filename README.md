# Framewrok7 Components With Hyperapp

Mobile UI for Hyperapp

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@gulw/components.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@gulw/components
[download-image]: https://img.shields.io/npm/dm//@gulw/components.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/@gulw/components

## Updating

### v0.8.8 -September 4, 2018
  * List:
      * add `List.Group`, `List.Divider` component
      * add `isGrop` prop to enable List.Group
  * Minor fixes


#### check [Change Log](https://github.com/venecy/f7c/blob/master/CHANGELOG.md) for more.


## Components

[Kitchen Sink](https://venecy.github.io/f7c/kitchen-sink/)

Docs are not ready yet, 
you can learn about `Components` and their `Apis` in *[typing files](https://github.com/venecy/f7c/tree/master/components)* for now.


## Install

    npm install --save @gulw/components

You can also access bundled file in `unpkg`, global name is `F7Components`

    https://unpkg.com/@gulw/components@0.7.26/dist/f7-components.js


## Modularized

The following two ways used to load the **only components you used**, select one of the ways you like.

- Use [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)

   ```js
   // .babelrc or babel-loader option
   {
     "plugins": [
       ["import", { "libraryName": "@gulw/components", "style": "css" }] // `style: true` for less
     ]
   }
   ```

   This allows you to import components without having to manually import the corresponding stylesheet. The babel plugin will automatically import stylesheets.

   ```jsx
   // import js and css modularly, parsed by babel-plugin-import
   import { Picker } from '@gulw/components';
   ```

- Manually import

   ```jsx
   import Picker from '@gulw/components/lib/picker';  // for js
   import '@gulw/components/lib/picker/style/css';    // for css
   // import '@gulw/components/lib/picker/style';     // that will import less
   ```


## Example

See more example in *[demos](https://github.com/venecy/f7c/tree/master/kitchen-sink/demos)*

```js
import { h, app } from 'hyperapp'
import { Page, Navbar, ContentBlock } from '@gulw/components'
// import css
import '@gulw/components/dist/f7-components.css'

const Main = () => {
  return (
    <Page
      navbar={
        <Navbar center="My App" />
      }
    >
      <ContentBlock>
        <p>Example app</p>
      </ContentBlock>
    </Page>
  )
}

app({}, {}, Main, document.body)

```
