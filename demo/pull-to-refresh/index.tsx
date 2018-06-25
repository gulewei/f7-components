// eslint-disable-next-line no-unused-vars
import { h, app } from 'hyperapp'
// eslint-disable-next-line
import Page from '../../src/components/page'
import pullToRefresh from '../../src/components/_pull-to-refresh'

const mocker = {
  length: 30,

  deffer: 1500,

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

const state = {
  ptr: pullToRefresh.state,
  mocks: mocker.next()
}

const actions = {
  ptr: pullToRefresh.actions,
  resetMocks: (mocks) => ({ mocks })
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
      <Page>
        <pullToRefresh.view
          class="ptr"
          {...state.ptr}
          {...actions.ptr}
          indicator={{ deactivate: 'pull down' }}
          onRefresh={finish => mocker.async(mocks => {
            actions.resetMocks(mocks)
            finish()
          })}>
          <MockList mocks={state.mocks} />
        </pullToRefresh.view >
      </Page>
    )
  },

  // root
  document.getElementById('root')
)

const MockList = ({ mocks }) => {
  return (
    mocks.map((item, i) => <div key={i} class="mock-item">{i}:&nbsp;&nbsp;{item}</div>)
  )
}
