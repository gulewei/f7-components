import { h } from 'hyperapp'
import { ContentBlock, List, ListItem, InputItem, ImgIcon } from '../../components'

const F7Icon = <ImgIcon name='f7' />

const inputAction = (value) => {
  return value
}

const FullLayout = ({ full, onInput }) => {
  return ([
    <ContentBlock title="Full Layout" />,
    <List>
      <InputItem
        media={F7Icon}
        placeholder="Your name"
        type="text"
        value={full.name}
        onChange={name => onInput({ name })}
      >
        Name
      </InputItem>
      <InputItem
        media={F7Icon}
        placeholder="E-mail"
        type="email"
        value={full.email}
        onChange={email => onInput({ email })}
      >
        E-mail
      </InputItem>
      <InputItem
        media={F7Icon}
        placeholder="URL"
        type="url"
        value={full.url}
        onChange={url => onInput({ url })}
      >
        URL
      </InputItem>
      <InputItem
        media={F7Icon}
        placeholder="Password"
        type="password"
        value={full.password}
        onChange={password => onInput({ password })}
      >
        Password
      </InputItem>
      <InputItem
        media={F7Icon}
        placeholder="Phone"
        type="tel"
        value={full.tel}
        onChange={tel => onInput({ tel })}
      >
        Phone
      </InputItem>
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
      <InputItem
        media={F7Icon}
        type="date"
        value={full.date}
        onChange={date => onInput({ date })}
      >
        Birth date
      </InputItem>
      <InputItem
        media={F7Icon}
        type="datetime-local"
        value={full.dateTime}
        onChange={dateTime => onInput({ dateTime })}
      >
        Date time
      </InputItem>
    </List>
  ])
}

const IconsInputs = ({ icon, onInput }) => {
  return ([
    <ContentBlock title="Icons and Inputs" />,
    <List>
      
    </List>
  ])
}

export default {
  key: 'input',
  title: 'InputItem',
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
        <FullLayout full={state.full} onInput={actions.full.input} />
      </div>
    )
  }
}
