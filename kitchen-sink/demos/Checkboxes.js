import { h } from 'hyperapp'
import { ContentBlock, List, CheckboxItem } from '../components'

const checkboxes = [
  { label: 'Books', key: 'books' },
  { label: 'Movies', key: 'movies' },
  { label: 'Food', key: 'food' },
  { label: 'Drinks', key: 'drinks' }
]

export default {
  key: 'checkbox',
  title: 'Checkbox Item',
  state: {
    books: true,
    movies: false,
    food: false,
    drinks: false
  },
  actions: {
    onCheck: (value) => {
      return value
    }
  },
  view: (state, actions) => {
    return (
      <div>
        <ContentBlock title="Checkbox Group"></ContentBlock>
        <List>
          {
            checkboxes.map(({ label, key }) => {
              return (
                <CheckboxItem
                  key={key}
                  checked={state[key]}
                  onChange={val => actions.onCheck({ [key]: val })}
                >
                  {label}
                </CheckboxItem>
              )
            })
          }
        </List>
      </div>
    )
  }
}
