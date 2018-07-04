/* eslint-disable no-unused-vars */
import { h, app } from 'hyperapp'
import { PullToRefresh, enumRefreshStatus } from '../../src'
import Layout from '../Layout'

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

// eslint-disable-next-line no-unused-vars
const MockList = ({ mocks }) => {
  return (
    mocks.map((item, i) => <div key={i} class="mock-item">{i}:&nbsp;&nbsp;{item}</div>)
  )
}

export default {
  // state
  state: {
    refreshStatus: enumRefreshStatus.release,
    mocks: []
  },
  // actions
  actions: {
    onRefreshChange: (refreshStatus) => ({ refreshStatus }),
    resetMocks: (mocks) => ({ mocks })
  },
  // view
  view: (state, actions) => {
    window.$ptr = { state, actions }
    return (
      <Layout key='ptr' title='PullToRefresh'>
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
      </Layout>
    )
  }
}
