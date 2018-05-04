// eslint-disable-next-line no-unused-vars
import { h, app } from 'hyperapp'
import pullToRefresh from '../../src/components/PullToRefresh'

const mocker = {
  length: 30,

  deffer: 50000,

  next: () => {
    let m = []
    for (let i = 0; i < mocker.length; i++) {
      m.push(Math.random() * 1000)
    }

    return m
  },

  async: callback => {
    setTimeout(() => callback(mocker.next()), mocker.deffer)
  }
}

app(
  // state
  {
    ptr: pullToRefresh.state,
    mocks: mocker.next()
  },

  // actions
  {
    ptr: pullToRefresh.actions,
    resetMocks: (mocks) => ({ mocks })
  },

  // view
  (state, actions) => {
    return (
      <pullToRefresh.view
        {...state.ptr}
        {...actions.ptr}
        indicator={{ deactivate: 'pull down' }}
        onRefresh={finish => mocker.async(mocks => {
          actions.resetMocks(mocks)
          finish()
        })}>
        <MockList mocks={state.mocks} />
      </pullToRefresh.view >
    )
  },

  // root
  document.getElementById('root')
)

// eslint-disable-next-line no-unused-vars
const MockList = ({ mocks }) => mocks.map((item, i) => <div key={i} class="mock-item">{i}:&nbsp;&nbsp;{item}</div>)
