// eslint-disable-next-line
import Toast from './Toast'
// eslint-disable-next-line
import { h } from 'hyperapp'
import { createApp } from '../_util'

const DURATION = 1500

function text (msg, duration = DURATION) {
  createApp((destroy) => {
    return [
      {
        show: true,
        duration
      },
      {
        close: () => {
          return { show: false }
        },
        schedule: () => (state, actions) => {
          setTimeout(actions.close, state.duration)
        }
      },
      (state, actions) => {
        return (state.show &&
          <Toast
            oncreate={actions.schedule}
            ondestroy={destroy}
          >
            {msg}
          </Toast>
        )
      }
    ]
  })
}

export default {
  text
}
