// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Loading from './Loading'
import { createApp } from '../_util'

const state = { show: true }

const view = (state, _) => {
  return (
    <Loading show={state.show}></Loading>
  )
}

function showIndicator () {
  return createApp(
    (destroy) => {
      return [
        state,
        { close: destroy },
        view
      ]
    }
  ).close
}

function create () {
  return createApp(
    (destroy) => {
      return [
        state,
        {
          show: () => {
            return { show: true }
          },
          hide: () => {
            return { show: false }
          },
          destroy
        },
        view
      ]
    }
  )
}

export default {
  showIndicator,
  create
}
