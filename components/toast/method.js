// eslint-disable-next-line
import Toast from './Toast'
// eslint-disable-next-line
import { h, app } from 'hyperapp'
import { createElement } from '../_util'

const DURATION = 1500

function create (msg, duration = DURATION, onClose, mask, onClick) {
  const { div, remove } = createElement()
  return app(
    { show: true },
    {
      close: () => {
        return { show: false }
      }
    },
    (state, actions) => {
      return (
        <Toast
          show={state.show}
          mask={mask}
          onOpen={() => {
            if (duration !== 0) {
              setTimeout(actions.close, duration)
            }
          }}
          onToastClick={onClick}
          onClose={() => {
            onClose && onClose()
            remove()
          }}
        >
          {msg}
        </Toast>
      )
    },
    div
  )
}

let _close

function text (msg, duration, onClose, mask, onClick) {
  hide()
  _close = create(msg, duration, onClose, mask, onClick).close
}

function hide () {
  if (_close) {
    _close()
  }
  _close = null
}

export default {
  text,
  hide
}
