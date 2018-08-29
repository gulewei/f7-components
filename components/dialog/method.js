// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Dialog from './Dialog'
import { createApp } from '../_util'

let GLOBAL_CONFIG = {
  title: 'Message',
  okText: 'OK',
  cancleText: 'Cancle'
}

const close = () => {
  return { show: false }
}

const view = (state, actions) => {
  return (
    <Dialog
      {...state}
      onButtonsClick={actions.close}
      onClose={actions.destroy}
    />
  )
}

/**
 * @param {string} text
 * @param {string} title
 * @param {*[]} buttons
 * @returns {() => void}
 */
const createDialog = (text, title, buttons) => {
  return createApp(
    (destroy) => {
      return [
        {
          show: true,
          title: title || GLOBAL_CONFIG.title,
          text,
          buttons
        },
        { close, destroy },
        view
      ]
    }
  ).close
}

function config (config) {
  GLOBAL_CONFIG = {
    ...GLOBAL_CONFIG,
    ...config
  }
}

function alert (text, title, onOk) {
  if (typeof title === 'function') {
    onOk = title
    title = undefined
  }
  return createDialog(text, title, [{ text: GLOBAL_CONFIG.okText, onclick: onOk }])
}

function confirm (text, title, onOk, onCancel) {
  if (typeof title === 'function') {
    onCancel = onOk
    onOk = title
    title = undefined
  }
  createDialog(text, title, [
    { text: GLOBAL_CONFIG.cancleText, onclick: onCancel },
    { text: GLOBAL_CONFIG.okText, onclick: onOk }
  ])
}

function action (text, title, buttons) {
  if (Array.isArray(title)) {
    buttons = title
    title = undefined
  }
  createDialog(text, title, buttons)
}

function custom (props) {
  const {
    onButtonsClick,
    onOverlayClick,
    onOpen,
    onClose,
    ...state
  } = props
  const { close } = createApp((destroy) => {
    return [
      {
        ...state,
        show: true
      },
      {
        close,
        onButtonsClick,
        onOverlayClick,
        onOpen,
        onClose,
        destroy
      },
      (state, actions) => {
        return (
          <Dialog
            {...state}
            onOverlayClick={actions.onOverlayClick}
            onButtonsClick={actions.onButtonsClick || actions.close}
            onOpen={actions.onOpen}
            onClose={(el) => {
              actions.onClose(el)
              actions.destroy()
            }}
          />
        )
      }
    ]
  })
}

export default {
  config,
  alert,
  confirm,
  action,
  custom
}
