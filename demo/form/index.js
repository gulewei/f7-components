/* eslint-disable no-unused-vars */
import { h, app } from 'hyperapp'
import Page from '../../src/components/page'
import ContentBlock from '../../src/components/content-block'
import List, { Item } from '../../src/components/list'
import InputItem from '../../src/components/input-item'
import Icon from '../../src/components/icon'
import RangeSlider from '../../src/components/range-slider'
import CheckboxItem from '../../src/components/checkbox-item'

const F7Icon = <Icon name='f7' />

const toArray = state => {
  let a = []
  for (let key in state) {
    a.push(state[key])
  }
  return a
}

const InputElements = ({ elements, inputAction }) => {
  const items = toArray(elements)

  return items.map(({ name, filed, ...item }, i) => {
    return (
      <InputItem
        media={F7Icon}
        title={name}
        {...item}
        oninput={value => inputAction({ value, filed })}
      />
    )
  })
}

const CheckboxItemGroup = ({ checks, checkAction }) => {
  const items = toArray(checks)

  return (
    <div>
      <ContentBlock title="Checkbox Group" />
      <List>
        {items.map(({ checked, name, filed }) => (
          <CheckboxItem
            title={name}
            checked={checked}
            onchange={checked => checkAction({ filed, checked })}
            after={
              <span>123</span>
            }
          />
        ))}
      </List>
    </div>
  )
}

app(
  {
    // input-item
    person: { value: '', name: 'Person', placeholder: 'Your Name', type: 'text', filed: 'person' },
    email: { value: '', name: 'E-mail', placeholder: 'E-mail', type: 'email', filed: 'email' },
    url: { value: '', name: 'URL', placeholder: 'URL', type: 'url', filed: 'url' },
    password: { value: '', name: 'Password', placeholder: 'Password', type: 'password', filed: 'password' },
    phone: { value: '', name: 'Phone', placeholder: 'Phone', type: 'tel', filed: 'phone' },
    birthday: { value: '2014-04-30', name: 'Birth date', placeholder: 'Birth date', type: 'date', filed: 'birthday' },
    dateTime: { value: '', name: 'Date time', placeholder: '', type: 'datetime-local', filed: 'dateTime' },
    // select
    gender: { value: 'Male', options: ['Male', 'Female'], name: 'Gender', placeholder: 'Gender', filed: 'gender' },
    // switch
    switcher: { value: false, name: 'Switcher', filed: 'switcher' },
    // range
    range: { value: '50', min: '0', max: '100', step: '0.1', name: 'Range', filed: 'range' },
    // text area
    text: { value: '', name: 'Textarea', placeholder: '', filed: 'text' },
    // checkbox-item
    book: { checked: false, name: 'Book', filed: 'book' },
    movie: { checked: false, name: 'Movie', filed: 'movie' },
    food: { checked: false, name: 'Food', filed: 'food' },
    drinks: { checked: false, name: 'Drinks', filed: 'drinks' }
  },
  {
    input: ({ filed, value }) => state => {
      return {
        [filed]: { ...state[filed], value }
      }
    },
    check: ({ filed, checked }) => state => {
      return {
        [filed]: { ...state[filed], checked }
      }
    }
  },
  (state, actions) => {
    const {
      gender,
      switcher,
      range,
      text,

      book,
      movie,
      food,
      drinks,

      ...elements
    } = state

    window.$form = { state, actions }

    return (
      <Page>
        <ContentBlock title="FULL LAYOUT" />
        <List>
          <InputElements elements={elements} inputAction={actions.input} />
          <Item
            media={F7Icon}
            title={gender.name}
            input={
              <select
                onchange={e => actions.input({ value: e.target.value, filed: gender.filed })}
              >
                {gender.options.map(gender => (
                  <option>{gender}</option>
                ))}
              </select>
            }
          />
          <Item
            media={F7Icon}
            title={range.name}
            input={
              <RangeSlider
                value={range.value}
                min={range.min}
                max={range.max}
                step={range.step}
                onchange={e => actions.input({ value: e.target.value, filed: range.filed })}
              />
            }
          />
          <Item
            media={F7Icon}
            title={text.name}
            alignTop
            input={
              <textarea
                placeholder={text.placeholder}
                oninput={e => actions.input({ value: e.target.value, filed: text.filed })}
              >{text.value}</textarea>
            }
          />
        </List>

        <CheckboxItemGroup checks={{ book, movie, food, drinks }} checkAction={actions.check} />
      </Page>
    )
  },
  document.body
)
