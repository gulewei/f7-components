/* eslint-disable no-unused-vars */
import { h, app } from 'hyperapp'
import Page from '../../src/components/page'
import ContentBlock from '../../src/components/content-block'
import List, { Item } from '../../src/components/list'
import InputItem, { Input } from '../../src/components/input-item'
import Icon from '../../src/components/icon'
import RangeSlider from '../../src/components/range-slider'
// import Checkbox from '../../src/components/checkbox'
// import Radio from '../../src/components/radio'

const F7Icon = <Icon name='f7' />

const toArray = state => {
  let a = []
  for (let key in state) {
    a.push(state[key])
  }
  return a
}

app(
  {
    // inputs
    name: { value: '', name: 'Name', placeholder: 'Your Name', type: 'text', filed: 'name' },
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
    text: { value: '', name: 'Textarea', placeholder: '', filed: 'text' }
  },
  {
    input: ({ filed, e }) => state => {
      return {
        [filed]: { ...state[filed], value: e.target.value }
      }
    }
  },
  (state, actions) => {
    const {
      gender,
      switcher,
      range,
      text,
      ...elements
    } = state

    const items = toArray(elements)

    return (
      <Page>
        <ContentBlock title="FULL LAYOUT" />
        <List>
          {items.map(({ name, filed, ...item }, i) => {
            return (
              <InputItem
                media={F7Icon}
                title={name}
                input={
                  <Input {...item} oninput={e => actions.input({ e, filed })} />
                }
              />
            )
          })}
          <Item
            media={F7Icon}
            title={gender.name}
            input={
              <select
                onchange={e => actions.input({ e, filed: gender.filed })}
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
                onchange={e => actions.input({ e, filed: range.filed })}
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
                oninput={e => actions.input({ e, filed: text.filed })}
              >{text.value}</textarea>
            }
          />
        </List>
      </Page>
    )
  },
  document.body
)
