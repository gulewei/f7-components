import { h } from 'hyperapp'
import { ContentBlock, List, InputItem, ImgIcon } from '../components'

const F7Icon = <ImgIcon name='f7' />

const inputAction = (value) => {
  return value
}

const fileds = {
  full: [
    { placeholder: 'Your name', type: 'text', label: 'Name', key: 'name' },
    { placeholder: 'E-mail', type: 'email', label: 'E-mail', key: 'email' },
    { placeholder: 'URL', type: 'url', label: 'URL', key: 'url' },
    { placeholder: 'Password', type: 'password', label: 'Password', key: 'password' },
    { placeholder: 'Phone', type: 'tel', label: 'Phone', key: 'tel' },
    { placeholder: '', type: 'date', label: 'Birth date', key: 'date' },
    { placeholder: '', type: 'datetime-local', label: 'Date time', key: 'dateTime' }
  ],
  just: [
    { placeholder: 'Your name', type: 'text', label: 'Name', key: 'name' },
    { placeholder: 'E-mail', type: 'email', label: 'E-mail', key: 'email' },
    { placeholder: '', type: 'date', label: 'Birth date', key: 'date' }
  ]
}

const Layouts = {
  Full: ({ key, title, data, onInput }) => {
    return ([
      <ContentBlock title={title} key={`${key}_title`} />,
      <List key={`${key}_list`}>
        {
          fileds.full.map(({ placeholder, type, label, key }) => {
            return (
              <InputItem
                media={F7Icon}
                key={key}
                type={type}
                placeholder={placeholder}
                value={data[key]}
                onChange={val => {
                  onInput({ [key]: val })
                }}
              >
                {label}
              </InputItem>
            )
          })
        }
        {/* select */}
        <List.Item
          media={F7Icon}
          input={
            <select onchange={e => onInput({ gender: e.target.value })}>
              <option selected={data.gender === 'Male'}>Male</option>
              <option selected={data.gender === 'Female'}>Female</option>
            </select>
          }
        >
          Gender
        </List.Item>
      </List>
    ])
  },
  Just: ({ key, title, data, onInput, hasIcon, hasLabel, inset }) => {
    return ([
      <ContentBlock title={title} key={`${key}_title`} />,
      <List inset={inset} key={`${key}_list`}>
        {
          fileds.just.map(({ placeholder, type, key, label }) => {
            return (
              <InputItem
                key={key}
                media={hasIcon && F7Icon}
                title={hasLabel && label}
                type={type}
                placeholder={placeholder}
                value={data[key]}
                onChange={val => {
                  onInput({ [key]: val })
                }}
              />
            )
          })
        }
        {/* select */}
        <List.Item
          media={hasIcon && F7Icon}
          title={hasLabel && 'Gender'}
          input={
            <select onchange={e => onInput({ gender: e.target.value })}>
              <option selected={data.gender === 'Male'}>Male</option>
              <option selected={data.gender === 'Female'}>Female</option>
            </select>
          }
        />
      </List>
    ])
  }
}

export default {
  key: 'input',
  title: 'Input Item',
  state: {
    full: {
      name: '',
      email: '',
      url: '',
      password: '',
      tel: '',
      gender: 'Male',
      date: '',
      dateTime: ''
    },
    icon: {
      name: '',
      email: '',
      gender: 'Male',
      date: ''
    },
    label: {
      name: '',
      email: '',
      gender: 'Male',
      date: ''
    },
    just: {
      name: '',
      email: '',
      gender: 'Male',
      date: ''
    },
    inset: {
      name: '',
      email: '',
      gender: 'Male',
      date: ''
    }
  },
  actions: {
    full: {
      input: inputAction
    },
    icon: {
      input: inputAction
    },
    label: {
      input: inputAction
    },
    just: {
      input: inputAction
    },
    inset: {
      input: inputAction
    }
  },
  view: (state, actions) => {
    return (
      <div>
        <Layouts.Full
          key="full"
          title="Full Layout"
          data={state.full}
          onInput={actions.full.input}
        />
        <Layouts.Just
          key="icon"
          title="Icons and inputs"
          data={state.icon}
          onInput={actions.icon.input} hasIcon
        />
        <Layouts.Just
          key="label"
          title="Labels and inputs"
          data={state.label}
          onInput={actions.label.input}
          hasLabel
        />
        <Layouts.Just
          key="just"
          title="Just inputs"
          data={state.just}
          onInput={actions.just.input}
        />
        <Layouts.Just
          key="inset"
          title="Inset list"
          data={state.inset}
          onInput={actions.inset.input}
          inset={true}
        />
      </div>
    )
  }
}
