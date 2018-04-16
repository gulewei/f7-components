// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import { Loading } from '../components/Loading'
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

const api = ({ loading }) => loading

export const loading = install(state, actions, view, api)
