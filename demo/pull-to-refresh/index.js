// eslint-disable-next-line no-unused-vars
import { h, app } from 'hyperapp'
import pullToRefresh from '../../src/components/PullToRefresh'

const mocker = {
  length: 30,

  next: () => {
    let m = []
    for (let i = 0; i < mocker.length; i++) {
      m.push(Math.random() * 1000)
    }

    return m
  },

  async: callback => {
    setTimeout(() => callback(mocker.next()), 1500)
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
    window.$app = { state, actions }

    const { mocks } = state
    const { resetMocks } = actions

    return (
      <pullToRefresh.view
        {...state.ptr}
        {...actions.ptr}
        distance={50}
        onRefresh={finish => mocker.async(mocks => {
          resetMocks(mocks)
          finish()
        })}>
        <MockList mocks={mocks} />
      </pullToRefresh.view >
    )
  },

  // root
  document.getElementById('root')
)

// eslint-disable-next-line no-unused-vars
const MockList = ({ mocks }) => mocks.map((item, i) => <div key={i} class="mock-item">{i}:&nbsp;&nbsp;{item}</div>)
