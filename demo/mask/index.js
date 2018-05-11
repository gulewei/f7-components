/* eslint-disable no-unused-vars */
import { h, app } from 'hyperapp'
import Page from '../../src/components/page'
import Mask from '../../src/components/mask'
import ContentBlock from '../../src/components/content-block'

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
        <ContentBlock title="mask">
          <p onclick={e => { actions.show(true) }}
          ><a>mask</a></p>
          <Mask
            // type="preloader-indicator"
            show={state.show}
            onclick={e => actions.show(false)}
          />
        </ContentBlock>
      </Page>
    )
  },
  document.body
)
