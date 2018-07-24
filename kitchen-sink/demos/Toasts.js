import { h } from 'hyperapp'
import { ContentBlock, Toast } from '../../components'

export default {
  key: 'toasts',
  title: 'Toast',
  state: {},
  actions: {},
  view: () => {
    return (
      <ContentBlock title="Toast">
        <p onclick={e => {
          Toast.text(`It's a toast`)
        }}>
          <a>Toast</a>
        </p>

        <p onclick={e => {
          Toast.text(`It's a 2s toast`, 2000)
        }}>
          <a>Toast with 2s duration</a>
        </p>
      </ContentBlock>
    )
  }
}
