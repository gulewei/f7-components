/* eslint-disable no-unused-vars */
import { h, app } from 'hyperapp'
import { Page, Overlay, enumOverlayTypes, ContentBlock } from '../../src'
import '../../src/index.less'

app(
  {
    show: false
  },
  {
    show: show => ({ show })
  },
  (state, actions) => {
    return (
      <Page>
        <ContentBlock title="Overlay">
          <p onclick={e => { actions.show(true) }}>
            <a>Overlay</a>
          </p>
          {state.show && <Overlay
            key='overlay'
            onOverlayClick={e => actions.show(false)}
          />}
        </ContentBlock>
      </Page>
    )
  },
  document.body
)
