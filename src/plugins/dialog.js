// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import { Dialog } from '../components/Dialog'
import { install } from '../utils'

const state = {
  show: false,
  title: '',
  content: '',
  buttons: []
}

const actions = {
  open ({ title = '', content = '', buttons = [] }) {
    return (state, actions) => ({
      show: true, title, content, buttons
    })
  },

  close () {
    return { show: false }
  }
}

const view = (state, actions) => (
  <Dialog {...state} close={actions.close} />
)

const api = ({ open }) => {
  let dialogTitle = '系统消息'
  let dialogConfrim = '确认'
  let dialogCancel = '取消'

  return {
    alert (content, title = dialogTitle, click) {
      open({ content, title, buttons: [{ text: dialogConfrim, click }] })
    },

    confirm (content, title = dialogTitle, callbackOk, callbackCancel) {
      open({
        content,
        title,
        buttons: [
          { text: dialogCancel, callbackCancel },
          { text: dialogConfrim, callbackOk }
        ]
      })
    },

    dialog (content, title = dialogTitle, buttons) {
      open({ content, title, buttons })
    },

    setDialog (title = dialogTitle, confirmText = dialogConfrim, concelText = dialogCancel) {
      dialogTitle = title
      dialogConfrim = confirmText
      dialogCancel = concelText
    }
  }
}

export const { alert, confirm, dialog, setDialog } = install(state, actions, view, api)
