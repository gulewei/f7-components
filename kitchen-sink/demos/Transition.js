/* eslint-disable no-unused-vars */
import { h } from 'hyperapp'
import { CSSTransition, ContentBlock, Button } from '../../components'
import Layout from '../Layout'
/* eslint-enable no-unused-vars */

export default {
  state: {
    status: 'out'
  },
  actions: {
    in: () => {
      return { status: 'in' }
    },
    out: () => {
      return { status: 'out' }
    }
  },
  view: (state, actions) => {
    const isIn = state.status === 'in'
    return (
      <Layout
        key="transition"
        title="Transition"
      >
        <ContentBlock title="CSS Transtion" style={{ position: 'relative' }}>
          <a
            class="link"
            onclick={e => {
              isIn ? actions.out() : actions.in()
            }}
          >{state.status}</a>
          {isIn && (
            <CSSTransition enter="test-slidein" exit="test-slideout">
              <p key="a" style={{ position: 'absolute', left: '0', right: '0' }}>
                <Button>I'm a Button</Button>
              </p>
            </CSSTransition>
          )
          }
        </ContentBlock>
      </Layout>
    )
  },
  key: 'csstransition',
  title: 'CSS Transition'
}
