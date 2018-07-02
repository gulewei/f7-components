// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Dialog from './Dialog'

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

const setDefault = (newOptions) => {
  OPTIONS = {
    ...OPTIONS,
    ...newOptions
  }
}

const actions = {
  alert: ({ text, title = OPTIONS.title, onOk }) => {
    return {
      show: true,
      title,
      text,
      buttons: [{ text: OPTIONS.okText, onclick: onOk }]
    }
  },

  confirm: ({ text, title = OPTIONS.title, onOk, onCancel }) => {
    return {
      show: true,
      title,
      text,
      buttons: [
        { text: OPTIONS.cancleText, onclick: onCancel },
        { text: OPTIONS.okText, onclick: onOk }
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
      onButtonsClick={onButtonsClick || actions.close}
    />
  )
}

const api = (actions) => {
  return {
    alert: (text, title, onOk) => {
      if (typeof title === 'function') {
        onOk = title
        title = undefined
      }

      actions.alert({ text, title, onOk })
      return actions.close
    },

    confirm: (text, title, onOk, onCancel) => {
      if (typeof title === 'function') {
        onCancel = onOk
        onOk = title
        title = undefined
      }

      actions.confirm({ text, title, onOk, onCancel })
      return actions.close
    },

    action: (text, title, buttons) => {
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

    setDefault
  }
}

export default {
  state: defaultState,
  actions,
  view,
  api
}
