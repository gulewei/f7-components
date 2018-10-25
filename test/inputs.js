import { h, app } from 'hyperapp'
import { Page, Navbar, List, InputItem } from '../../components'
import '../../dist/f7-components.css'

const state = {
  rawInput: '',
  itemInput: ''
}

const actions = {
  setState: (state) => state
}

const view = ({ rawInput, itemInput }, { setState }) => {
  return (
    <Page
      navbar={
        <Navbar>Test Inputs</Navbar>
      }
    >
      <List>
        <List.Item
          input={
            <input type="text" value={rawInput} oninput={e => {
              setState({ rawInput: e.target.value })
            }} />
          }
        >
          raw input
        </List.Item>
        <InputItem
          value={itemInput}
          onChange={itemInput => {
            setState({ itemInput })
          }}
        >
          item input
        </InputItem>
      </List>
    </Page>
  )
}

function main () {
  app(state, actions, view, document.getElementById('app'))
}

main()