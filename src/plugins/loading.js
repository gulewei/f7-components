// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Loading from '../components/loading'

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
    showLoading: () => loading(true),
    hideLoading: () => loading(false)
  }
}

export default {
  state,
  actions,
  view,
  api
}
