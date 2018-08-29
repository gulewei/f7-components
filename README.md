# Framewrok7 Components With Hyperapp

Mobile UI for Hyperapp

## Updating

### v0.8.5 = August 29, 2018

  * Add new component `Panel`.
  * More specific doc in typing files
  * Update `Picker` component.
    * add `onOpen` and `onClose` hooks
    * update `Picker.Toolbar` component
    * update picker method options
  * Update `Transiton` component:
    * update animation hooks, now only `onEntered` is provided, other hooks replced by in child's lifecycle.


## Components

[Kitchen Sink](https://venecy.github.io/f7c/kitchen-sink/)

Docs are not ready yet, 
you can learn about `Components` and their `Apis` in *[typing files](https://github.com/venecy/f7c/blob/master/components/index.d.ts)* for now.

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

