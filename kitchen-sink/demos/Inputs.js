import { h } from 'hyperapp'
import { ContentBlock, List, ListItem, InputItem, ImgIcon } from '../components'

const F7Icon = <ImgIcon name='f7' />

const inputAction = (value) => {
  return value
}

// eslint-disable-next-line no-unused-vars
const Layouts = {
  Full: ({ full, onInput }) => {
    const inputs = [
      { placeholder: 'Your name', type: 'text', label: 'Name', key: 'name' },
      { placeholder: 'E-mail', type: 'email', label: 'E-mail', key: 'email' },
      { placeholder: 'URL', type: 'url', label: 'URL', key: 'url' },
      { placeholder: 'Password', type: 'password', label: 'Password', key: 'password' },
      { placeholder: 'Phone', type: 'tel', label: 'Phone', key: 'tel' },
      { placeholder: '', type: 'date', label: 'Birth date', key: 'date' },
      { placeholder: '', type: 'datetime-local', label: 'Date time', key: 'dateTime' }
    ]
    return ([
      <ContentBlock title="Full Layout" />,
      <List>
        {
          inputs.map(({ placeholder, type, label, key }) => {
            return (
              <InputItem
                media={F7Icon}
                key={key}
                type={type}
                placeholder={placeholder}
                value={full[key]}
                onChange={val => onInput({ [key]: val })}
              >
                {label}
              </InputItem>
            )
          })
        }
        {/* select */}
        <ListItem
          media={F7Icon}
          input={
            <select onchange={e => onInput({ gender: e.target.value })}>
              <option selected={full.gender === 'Male'}>Male</option>
              <option selected={full.gender === 'Female'}>Female</option>
            </select>
          }
        >
          Gender
        </ListItem>
      </List>
    ])
  },
  Just: ({ title, data, onInput, hasIcon, hasLabel, inset }) => {
    const inputs = [
      { placeholder: 'Your name', type: 'text', label: 'Name', key: 'name' },
      { placeholder: 'E-mail', type: 'email', label: 'E-mail', key: 'email' },
      { placeholder: '', type: 'date', label: 'Birth date', key: 'date' }
    ]
    return ([
      <ContentBlock title={title} />,
      <List inset={inset}>
        {
          inputs.map(({ placeholder, type, key, label }) => {
            return (
              <InputItem
                key={key}
                media={hasIcon && F7Icon}
                title={hasLabel && label}
                type={type}
                placeholder={placeholder}
                value={data[key]}
                onChange={val => onInput({ [key]: val })}
              />
            )
          })
        }
        {/* select */}
        <ListItem
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
        <Layouts.Full full={state.full} onInput={actions.full.input} />
        <Layouts.Just title="Icons and inputs" data={state.icon} onInput={actions.icon.input} hasIcon />
        <Layouts.Just title="Labels and inputs" data={state.label} onInput={actions.icon.input} hasLabel />
        <Layouts.Just title="Just inputs" data={state.just} onInput={actions.icon.input} />
        <Layouts.Just title="Inset list" data={state.inset} onInput={actions.icon.input} inset={true} />
      </div>
    )
  }
}
