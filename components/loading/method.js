// eslint-disable-next-line
import { h, app } from 'hyperapp'
// eslint-disable-next-line
import Loading from './Loading'
import { createElement } from '../_util'

function create () {
  const { div, remove: close } = createElement()
  return app(
    {},
    { close },
    () => {
      return (
        <Loading show={true} ></Loading>
      )
    },
    div
  )
}

let _action

export default {
  create,
  show: () => {
    if (!_action) {
      _action = create().close
    }
  },
  hide: () => {
    if (_action) {
      _action()
    }
    _action = null
  }
}
