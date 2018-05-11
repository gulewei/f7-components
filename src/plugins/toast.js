// eslint-disable-next-line
import Toast from '../components/toast'
// eslint-disable-next-line
import { h } from 'hyperapp'
import { install } from '../utils'

const defaultDuration = 1500

const state = {
  show: false,
  msg: '',
  duration: defaultDuration
}

const actions = {
  toast ({ msg, duration = defaultDuration }) {
    return { show: true, msg, duration }
  },

  close () {
    return { show: false, msg: '' }
  },

  scheduleToast: (toast) => (state, actions) => {
    actions.toast(toast)
    setTimeout(actions.close, state.duration)
  }
}

const view = (state, actions) => (
  <Toast {...state} close={actions.close} />
)

const api = ({ scheduleToast }) => {
  return (msg, duration) => scheduleToast({ msg, duration })
}

const toast = install(state, actions, view, api)

export default toast
