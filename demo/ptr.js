import { h, app } from 'hyperapp'
import { Ptr } from '../src/components/Ptr'

const mocker = {
  next: () => {
    let m = []
    for (let i = 0; i < 15; i++) {
      m.push(Math.random() * 1000)
    }

    return m
  },

  async: callback => {
    setTimeout(() => callback(mocker.next()), 500)
  }
}

const state = {
  transform: renderTransForm(0),
  mocks: mocker.next()
}

const actions = {
  render: y => ({ transform: renderTransForm(y) }),
  resetMocks: mocks => ({ mocks })
}

const view = (state, actions) => {
  const {
    transform, mocks
  } = state

  const {
    render, resetMocks
  } = actions

  return (
    <Ptr {...{ transform, render }}
      startCallback={done => {
        mocker.async(mocks => {
          resetMocks(mocks)
          done()
        })
      }}
    >
      {mocks.map((item, i) => <div style={{height: '50px'}}>{i}: {item}</div>)}
    </Ptr>
  )
}

app(state, actions, view, document.getElementById('root'))

function renderTransForm (y) {
  return `translate3d(0px, ${-y}px, 0px) scale(1)`
}
