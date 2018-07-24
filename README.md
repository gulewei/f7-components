## Framewrok7 Components With Hyperapp

Mobile UI for Hyperapp

### Show

[Kitchen Sink](https://venecy.github.io/f7c/kitchen-sink/)

Docs are not ready yet, 
you can learn about the components and their Apis in *[f7-component.d.ts](https://github.com/venecy/f7c/blob/master/components/index.d.ts)* for now.

### Install

    npm install --save @gulw/components

### Example

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

