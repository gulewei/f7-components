/* eslint-disable no-unused-vars */
import { h } from 'hyperapp'
import {
  ContentBlock,
  List,
  ListItem,
  ImgIcon,
  RangeSlider,
  CheckboxItem,
  RadioItem
} from '../../src'
import Layout from '../Layout'

const F7Icon = <ImgIcon name='f7' />

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
      <ListItem
        key={filed}
        media={F7Icon}
        title={name}
        input={
          <input
            {...item}
            oninput={e => inputAction({ value: e.target.value, filed })}
          />
        }
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
        {items.map(({ checked, name, filed }, i) => (
          <CheckboxItem
            key={filed}
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

const RadioItemGrop = ({ radioValue, radios, selectActon }) => {
  const items = toArray(radios)
  return (
    <div>
      <ContentBlock title="Radio Group" />
      <List>
        {items.map(({ filed, value }) => (
          <RadioItem
            key={filed}
            title={value}
            checked={value === radioValue}
            name="radio"
            onchange={() => selectActon(value)}
          />
        ))}
      </List>
    </div>
  )
}

export default {
  state: {
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
    drinks: { checked: false, name: 'Drinks', filed: 'drinks' },
    // radio
    radioValue: 'Drinks',
    radios: {
      book: { value: 'Book', filed: 'book' },
      movie: { value: 'Movie', filed: 'movie' },
      food: { value: 'Food', filed: 'food' },
      drinks: { value: 'Drinks', filed: 'drinks' }
    }
  },
  actions: {
    input: ({ filed, value }) => state => {
      return {
        [filed]: { ...state[filed], value }
      }
    },
    check: ({ filed, checked }) => state => {
      return {
        [filed]: { ...state[filed], checked }
      }
    },
    select: (value) => {
      return {
        radioValue: value
      }
    }
  },
  view: (state, actions) => {
    const {
      gender,
      switcher,
      range,
      text,

      book,
      movie,
      food,
      drinks,

      radioValue,
      radios,

      ...elements
    } = state

    window.$form = { state, actions }

    return (
      <Layout key='forms' title='Form Items'>
        <ContentBlock title="FULL LAYOUT" />
        <List>
          <InputElements elements={elements} inputAction={actions.input} />
          <ListItem
            key={gender.filed}
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
          <ListItem
            key={range.filed}
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
          <ListItem
            key={text.filed}
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

        <RadioItemGrop radioValue={radioValue} radios={radios} selectActon={actions.select} />
      </Layout>
    )
  }
}
