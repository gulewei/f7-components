import { ContentBlock, List, CheckboxItem } from '../../components'
import Layout from '../Layout'

export default {
  state: {
    books: true,
    movies: false,
    food: false,
    Drinks: false
  },
  actions: {
    onCheck: () => { }
  },
  view: (state, actions) => {
    return (
      <div>
        <ContentBlock title="Checkbox Group"></ContentBlock>
        <List>
          <CheckboxItem
            checked={state.books}
            onChange={books => actions.onCheck({ books })}
          >
            Books
          </CheckboxItem>
          <CheckboxItem
            checked={state.movies}
            onChange={movies => actions.onCheck({ movies })}
          >
            Movies
          </CheckboxItem>
          <CheckboxItem
            checked={state.food}
            onChange={food => actions.onCheck({ food })}
          >Food</CheckboxItem>
          {/* use title slot */}
          <CheckboxItem
            checked={state.drinks}
            onChange={drinks => actions.onCheck({ drinks })}
            title="Drinks"
          />
        </List>
      </div>
    )
  },
  key: 'checkbox',
  title: 'CheckboxItem'
}
