// eslint-disable-next-line no-unused-vars
import { h, app } from 'hyperapp'
// eslint-disable-next-line no-unused-vars
import Page from '../../src/components/page'
import '../../src/components/page/style'
// eslint-disable-next-line no-unused-vars
import PullToRefresh, { enumRefreshStatus } from '../../src/components/pull-to-refresh'
import '../../src/components/pull-to-refresh/style'

const mocker = {
  length: 30,

  deffer: 2200,

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
    refreshStatus: enumRefreshStatus.release,
    mocks: []
  },

  // actions
  {
    onRefreshChange: (refreshStatus) => ({ refreshStatus }),
    resetMocks: (mocks) => ({ mocks })
  },

  // view
  (state, actions) => {
    window.$ptr = { state, actions }

    return (
      <Page>
        <PullToRefresh
          class="ptr"
          indicator={{ deactivate: 'pull down' }}
          refreshStatus={state.refreshStatus}
          onRefreshChange={actions.onRefreshChange}
          onRefresh={finish => mocker.async(mocks => {
            actions.resetMocks(mocks)
            finish()
          })}>
          <MockList mocks={state.mocks} />
        </PullToRefresh>
      </Page>
    )
  },

  // root
  document.getElementById('root')
)

// eslint-disable-next-line no-unused-vars
const MockList = ({ mocks }) => {
  return (
    mocks.map((item, i) => <div key={i} class="mock-item">{i}:&nbsp;&nbsp;{item}</div>)
  )
}
