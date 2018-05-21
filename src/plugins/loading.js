// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Loading from '../components/loading'
import { install } from '../utils'

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

const loading = install(state, actions, view, api)

export default loading
