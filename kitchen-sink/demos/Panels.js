import { h } from 'hyperapp'
import Layout from '../Layout'
import { Panel, ContentBlock } from '../components'

const key = 'panel'

const PanelContent = (close) => {
  return (
    <ContentBlock title="Panel content here">
      <p onclick={close}>Close me</p>
    </ContentBlock>
  )
}

export default {
  path: '/panel',
  key,
  title: 'Side Panel',
  state: {
    outsidePanel: false,
    position: 'left'
  },
  actions: {
    outsidePanel: ({ show, position }) => {
      return { outsidePanel: show, position }
    }
  },
  noLayout: true,
  view: (state, actions) => {
    return (
      <Layout
        key={key}
        title="Panels"
        noBackIcon={true}
        outside={state.outsidePanel &&
          <Panel
            effect="cover"
            position={state.position}
          // onOverlayClick={() => actions.outsidePanel(false)}
          >
            {PanelContent(() => actions.outsidePanel({ show: false }))}
          </Panel>
        }
      >
        <ContentBlock title="Open by method">
          <p
            onclick={() => {
              Panel.open({ children: PanelContent(Panel.close) })
            }}
          >
            open left panel
          </p>
          <p
            onclick={() => {
              Panel.open({
                position: 'right',
                children: PanelContent(Panel.close)
              })
            }}
          >
            open right panel
          </p>
        </ContentBlock>

        <ContentBlock title="Open by action">
          <p
            onclick={() => {
              actions.outsidePanel({ show: true, position: 'left' })
            }}
          >
            open left panel
          </p>
          <p
            onclick={() => {
              actions.outsidePanel({ show: true, position: 'right' })
            }}
          >
            open right panel
          </p>
        </ContentBlock>
      </Layout>
    )
  }
}
