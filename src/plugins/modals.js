// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Dialog from '../components/dialog'
import { install } from '../utils'

const defaultState = {
  show: false,
  title: '',
  text: '',
  buttons: [],
  afterText: '',
  verticalButtons: false
}

let OPTIONS = {
  title: 'Message',
  okText: 'OK',
  cancleText: 'Cancle'
}

const setOptions = (newOptions) => {
  OPTIONS = {
    ...OPTIONS,
    ...newOptions
  }
}

const actions = {
  alert: ({ text, title = OPTIONS.title, onclick }) => {
    return {
      show: true,
      title,
      text,
      buttons: [{ text: OPTIONS.okText, onclick }]
    }
  },

  confirm: ({ text, title = OPTIONS.title, onclickOk, onclickCancle }) => {
    return {
      show: true,
      title,
      text,
      buttons: [
        { text: OPTIONS.cancleText, onclick: onclickCancle },
        { text: OPTIONS.okText, onclick: onclickOk }
      ]
    }
  },

  dialog: ({ text, title = OPTIONS.title, buttons }) => {
    return {
      show: true,
      title,
      text,
      buttons
    }
  },

  open: (props) => {
    return {
      ...props,
      show: true
    }
  },

  close: () => {
    return defaultState
  }
}

const view = (state, actions) => {
  const {
    onButtonsClick,
    ...rest
  } = state

  return (
    <Dialog
      {...rest}
      onButtonsClick={e => {
        actions.close()
      }}
    />
  )
}

const api = (actions) => {
  return {
    alert: (text, title, onclick) => {
      if (typeof title === 'function') {
        onclick = title
        title = undefined
      }

      actions.alert({ text, title, onclick })
      return actions.close
    },

    confirm: (text, title, onclickOk, onclickCancle) => {
      if (typeof title === 'function') {
        onclickCancle = onclickOk
        onclickOk = title
        title = undefined
      }

      actions.confirm({ text, title, onclickOk, onclickCancle })
      return actions.close
    },

    dialog: (text, title, buttons) => {
      if (Array.isArray(title)) {
        buttons = title
        title = undefined
      }

      actions.dialog({ text, title, buttons })
      return actions.close
    },

    custom: (props) => {
      actions.open(props)
      return actions.close
    },

    setOptions: setOptions
  }
}

const modals = install(defaultState, actions, view, api)

export default modals
