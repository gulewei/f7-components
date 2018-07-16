import { h } from 'hyperapp'
import { CSSTransition, ContentBlock, Button } from '../../components'
import Layout from '../Layout'

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
        <ContentBlock title="CSS Transtion">
          <a class="link" onclick={e => {
            isIn ? actions.out() : actions.in()
          }}>{state.status}</a>
          {isIn &&
            <CSSTransition enter="test-slidein" exit="test-slideout">
              <Button>I'm a Button</Button>
            </CSSTransition>
          }
        </ContentBlock>
      </Layout>
    )
  }
}
