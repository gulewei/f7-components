import { h } from 'hyperapp'
import { ContentBlock, List, RadioItem } from '../components'

const radios = [
  { label: 'Books', value: 'books' },
  { label: 'Movies', value: 'movies' },
  { label: 'Food', value: 'food' },
  { label: 'Drinks', value: 'drinks' }
]

export default {
  key: 'radio',
  title: 'Radio Item',
  state: {
    value: radios[0].value
  },
  actions: {
    select: (value) => {
      return { value }
    }
  },
  view: (state, actions) => {
    return (
      <div>
        <ContentBlock title="Checkbox Group"></ContentBlock>
        <List>
          {
            radios.map(({ label, value }) => {
              return (
                <RadioItem
                  key={value}
                  checked={state.value === value}
                  onChange={() => actions.select(value)}
                >
                  {label}
                </RadioItem>
              )
            })
          }
        </List>
      </div>
    )
  }
}
