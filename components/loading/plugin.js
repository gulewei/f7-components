// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Loading from './Loading'

const state = {
  show: false
}

const actions = {
  loading: show => ({ show })
}

const view = (state, actions) => (
  <Loading show={state.show} />
)

const api = ({ loading }) => {
  return {
    show: () => loading(true),
    hide: () => loading(false)
  }
}

export default {
  state,
  actions,
  view,
  api
}
