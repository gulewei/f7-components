import { h } from 'hyperapp'
import { ContentBlock, Preloader } from '../../components'

export default {
  key: 'preloaders',
  title: 'Preloader',
  state: {},
  actions: {},
  view: () => {
    return (
      <ContentBlock title="Preloader">
        <Preloader />
      </ContentBlock>
    )
  }
}
