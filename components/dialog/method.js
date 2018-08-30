// eslint-disable-next-line
import { h, app } from 'hyperapp'
// eslint-disable-next-line
import Dialog from './Dialog'
import { createElement } from '../_util'

let CONFIG = {
  title: 'Message',
  okText: 'OK',
  cancleText: 'Cancle'
}

function config (config) {
  CONFIG = {
    ...CONFIG,
    ...config
  }
}

function custom (props) {
  const {
    title = CONFIG.title,
    text,
    onButtonsClick,
    onClose,
    ...rests
  } = props
  const { div, remove } = createElement()
  return app(
    { show: true },
    {
      close: () => {
        return { show: false }
      }
    },
    (state, actions) => {
      return (
        <Dialog
          {...rests}
          title={title}
          show={state.show}
          onButtonsClick={onButtonsClick || actions.close}
          onClose={(el) => {
            onClose && onClose(el)
            remove()
          }}
        >
          {text}
        </Dialog>
      )
    },
    div
  )
}

function alert (text, title, onOk) {
  if (typeof title === 'function') {
    onOk = title
    title = undefined
  }
  return custom({
    text,
    title,
    buttons: [
      { text: CONFIG.okText, onclick: onOk }
    ]
  })
}

function confirm (text, title, onOk, onCancel) {
  if (typeof title === 'function') {
    onCancel = onOk
    onOk = title
    title = undefined
  }
  return custom({
    text,
    title,
    buttons: [
      { text: CONFIG.cancleText, onclick: onCancel },
      { text: CONFIG.okText, onclick: onOk }
    ]
  })
}

function action (text, title, buttons) {
  if (Array.isArray(title)) {
    buttons = title
    title = undefined
  }
  return custom({ text, title, buttons })
}

export default {
  config,
  alert,
  confirm,
  action,
  custom
}
