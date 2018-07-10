/* eslint-disable no-unused-vars */
import { h } from 'hyperapp'
import { Overlay, enumOverlayTypes, ContentBlock } from '../../src'
import Layout from '../Layout'

export default {
  state: {
    show: false
  },
  actions: {
    show: show => ({ show })
  },
  view: (state, actions) => {
    return (
      <Layout key='overlay' title='Overlay'>
        <ContentBlock title="Overlay">
          <p onclick={e => { actions.show(true) }}>
            <a>Overlay</a>
          </p>
          {state.show && <Overlay
            key='overlay'
            onOverlayClick={e => actions.show(false)}
          />}
        </ContentBlock>
      </Layout>
    )
  }
}
