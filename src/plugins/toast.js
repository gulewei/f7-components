// eslint-disable-next-line
import Toast from '../components/toast'
// eslint-disable-next-line
import { h } from 'hyperapp'

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
  return {
    toast: (msg, duration) => toast({ msg, duration })
  }
}

export default {
  state: defaultState,
  actions,
  view,
  api
}
