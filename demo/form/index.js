/* eslint-disable no-unused-vars */
import { h, app } from 'hyperapp'
import Page from '../../src/components/page'
import ContentBlock from '../../src/components/content-block'
import List, { Item } from '../../src/components/list'
import InputItem from '../../src/components/input-item'
// import Checkbox from '../../src/components/checkbox'
// import Radio from '../../src/components/radio'

const demo = {
  state: {
    name: ''
  },

  actions: {
    input: field => field
  },

  view: (state, actions) => {
    return (
      <Page>
        <ContentBlock title="FULL LAYOUT" />
        <List>
          <InputItem
            title="Name"
            value={state.name}
            onInput={name => actions.input({ name })}
            placeholder='Your Name'
          />
        </List>
      </Page>
    )
  }
}

app(demo.state, demo.actions, demo.view, document.body)
