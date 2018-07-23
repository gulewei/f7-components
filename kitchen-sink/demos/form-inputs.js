/* eslint-disable no-unused-vars */
import { h } from 'hyperapp'
import {
  ContentBlock,
  List,
  ListItem,
  ImgIcon,
  Slider,
  Switch,
  InputItem,
  TextareaItem,
  CheckboxItem,
  RadioItem
} from '../../components'
import Layout from '../Layout'

const F7Icon = <ImgIcon name='f7' />

const toArray = state => {
  let a = []
  for (let key in state) {
    a.push(state[key])
  }
  return a
}

// Input
const InputGroup = ({ elements, inputAction }) => {
  const items = toArray(elements)

  return ([
    <ContentBlock title="Input" />,
    <List>
      {
        items.map(({ name, filed, ...item }, i) => {
          return (
            <InputItem
              key={filed}
              media={F7Icon}
              {...item}
              onChange={value => inputAction({ value, filed })}
            >
              {name}
            </InputItem >
          )
        })
      }
    </List>
  ])
}

// Textarea
const TextareaGroup = ({ text, inputAction }) => {
  return (
    [
      <ContentBlock title="Textarea"></ContentBlock>,
      <List>
        <TextareaItem
          key={text.filed}
          media={F7Icon}
          alignTop
          placeholder={text.placeholder}
          value={text.value}
          onChange={value => inputAction({ value, filed: text.filed })}
        >
          {text.name}
        </TextareaItem>
      </List>
    ]
  )
}

// Checkbox
const CheckboxItemGroup = ({ checks, checkAction }) => {
  const items = toArray(checks)

  return ([
    <ContentBlock title="Checkbox"></ContentBlock>,
    <List>
      {items.map(({ checked, name, filed }, i) => (
        <CheckboxItem
          key={filed}
          title={name}
          checked={checked}
          onChange={checked => checkAction({ filed, checked })}
          after={
            <span>123</span>
          }
        />
      ))}
    </List>
  ])
}

// Radio
const RadioItemGrop = ({ radioValue, radios, selectActon }) => {
  const items = toArray(radios)
  return ([
    <ContentBlock title="Radio Group" />,
    <List>
      {items.map(({ filed, value }) => (
        <RadioItem
          key={filed}
          title={value}
          checked={value === radioValue}
          // name="radio"
          onChange={() => selectActon(value)}
        />
      ))}
    </List>
  ])
}

// Select
const SelectGroup = ({ gender, inputAction }) => {
  return ([
    <ContentBlock title="Select"></ContentBlock>,
    <List>
      <ListItem
        key={gender.filed}
        media={F7Icon}
        title={gender.name}
        input={
          <select
            onchange={e => inputAction({ value: e.target.value, filed: gender.filed })}
          >
            {gender.options.map(gender => (
              <option>{gender}</option>
            ))}
          </select>
        }
      />
    </List>
  ])
}

// Slider
const SliderGroup = ({ range, inputAction }) => {
  return ([
    <ContentBlock title="Slider"></ContentBlock>,
    <List>
      <ListItem
        key={range.filed}
        media={F7Icon}
        title={range.name}
        input={
          <Slider
            value={range.value}
            min={range.min}
            max={range.max}
            step={range.step}
            onChange={value => inputAction({ value, filed: range.filed })}
          />
        }
      />
    </List>
  ])
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
    range: { value: 50, min: 0, max: 100, step: 0.1, name: 'Range', filed: 'range' },
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
        <InputGroup elements={elements} inputAction={actions.input} />
        <SelectGroup gender={gender} inputAction={actions.input} />
        <TextareaGroup text={text} inputAction={actions.input} />
        <SliderGroup range={range} inputAction={actions.input} />
        <CheckboxItemGroup checks={{ book, movie, food, drinks }} checkAction={actions.check} />
        <RadioItemGrop radioValue={radioValue} radios={radios} selectActon={actions.select} />
      </Layout>
    )
  },
  key: 'forms',
  title: 'Form Elements'
}
