import { h, app } from 'hyperapp'
import Panel from './Panel'
import { createElement } from '../_util'

function create (props) {
  const {
    content,
    onOverlayClick,
    onClosed,
    ...rests
  } = props
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
        <div class="panel-wraper">
          {state.show &&
            <Panel
              {...rests}
              effect={'cover'}
              onOverlayClick={onOverlayClick || actions.close}
              onClosed={() => {
                onClosed && onClosed()
                remove()
              }}
            >
              {content}
            </Panel>
          }
        </div>
      )
    },
    div
  )
}

let _close

function open (props) {
  // close opened panel if there is
  close()
  _close = create(props).close
}

function close () {
  if (_close) {
    _close()
  }
  _close = null
}

export default {
  open,
  close
}
