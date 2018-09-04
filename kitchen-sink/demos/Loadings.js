import { h } from 'hyperapp'
import { Loading, ContentBlock } from '../components'

export default {
  key: 'loadings',
  title: 'Loading',
  state: {},
  actions: {},
  view: (state, actions) => {
    return (
      <ContentBlock title="Loading">
        <p
          onclick={e => {
            Loading.show()
            setTimeout(() => {
              Loading.hide()
            }, 2000)
          }}
        >
          <a>loading</a>
        </p>

        {/* <p
          onclick={e => {
            Loading.show('loading...')
            // setTimeout(() => {
            //   Loading.hide()
            // }, 2000)
          }}
        >
          <a>loading text</a>
        </p> */}
      </ContentBlock>
    )
  }
}
