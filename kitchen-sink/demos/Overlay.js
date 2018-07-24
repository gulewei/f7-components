/* eslint-disable no-unused-vars */
import { h } from 'hyperapp'
import { Overlay, enumOverlayTypes, ContentBlock } from '../../components'
import Layout from '../Layout'

export default {
  key: 'overlay',
  title: 'Overlay',
  state: {
    show: false
  },
  actions: {
    show: show => ({ show })
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
            key='overlay'
            onOverlayClick={e => actions.show(false)}
          />
        }
      >
        <ContentBlock title="Overlay">
          <p onclick={e => { actions.show(true) }}>
            <a>Overlay</a>
          </p>
        </ContentBlock>
      </Layout>
    )
  }
}
