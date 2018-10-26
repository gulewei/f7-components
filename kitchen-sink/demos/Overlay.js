import { h } from 'hyperapp'
import { Overlay, ContentBlock } from '../components'
import Layout from '../Layout'

export default {
  key: 'overlay',
  title: 'Overlay',
  state: {
    show: false
  },
  actions: {
    show: show => {
      return { show }
    }
  },
  noLayout: true,
  view: (state, actions) => {
    return (
      <Layout
        key='overlay'
        title='Overlay'
        outside={
          state.show &&
          <Overlay
            key='overlay_node'
            onOverlayClick={() => {
              actions.show(false)
            }}
          />
        }
      >
        <ContentBlock title="Overlay">
          <p
            onclick={() => {
              actions.show(true)
            }}
          >
            <a>Overlay</a>
          </p>
        </ContentBlock>
      </Layout>
    )
  }
}
