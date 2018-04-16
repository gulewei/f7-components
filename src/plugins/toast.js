// eslint-disable-next-line
import { Toast } from '../components/Toast'
// eslint-disable-next-line
import { h } from 'hyperapp'
import { install } from '../utils'

const state = {
  show: false,
  msg: '',
  duration: 1500
}

const actions = {
  toast (msg) {
    return { show: true, msg }
  },

  close () {
    return { show: false, msg: '' }
  },

  setToast (duration) {
    return { duration }
  }
}

const view = (state, actions) => (
  <Toast {...state} close={actions.close} />
)

const api = ({ toast, setToast }) => ({ toast, setToast })

export const { toast, setToast } = install(state, actions, view, api)
