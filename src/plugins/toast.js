// eslint-disable-next-line
import Toast from '../components/toast'
// eslint-disable-next-line
import { h } from 'hyperapp'
import { install } from '../utils'

const defaultDuration = 1500

const defaultState = {
  show: false,
  msg: '',
  duration: defaultDuration
}

const actions = {
  toast: ({ msg, duration = defaultDuration }) => (state, actions) => {
    actions.set({ show: true, msg, duration })
    actions.scheduleClose()
  },

  scheduleClose: () => (state, actions) => {
    setTimeout(() => {
      actions.set(defaultState)
    }, state.duration)
  },

  set: state => state
}

const view = (state, actions) => (
  <Toast show={state.show} msg={state.msg} />
)

const api = ({ toast }) => {
  return (msg, duration) => toast({ msg, duration })
}

const toast = install(defaultState, actions, view, api)

export default toast
