import { h } from 'hyperapp'
import { ContentBlock, Toast } from '../components'

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

        <p onclick={e => {
          Toast.text(`It's a toast with transparent mask`, 1500, () => { }, true)
        }}>
          <a>Toast with mask</a>
        </p>

        <p onclick={e => {
          Toast.text(`click me`, 0, () => { }, true, Toast.hide)
        }}>
          <a>Click to close</a>
        </p>
      </ContentBlock>
    )
  }
}
