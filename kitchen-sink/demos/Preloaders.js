import { h } from 'hyperapp'
import { ContentBlock, Preloader } from '../../components'
import SvgPreloader from '../../components/preloader/svg'

export default {
  key: 'preloaders',
  title: 'Preloader',
  state: {},
  actions: {},
  view: () => {
    return (
      <ContentBlock title="Preloader">
        <Preloader />
        <p><SvgPreloader/></p>
      </ContentBlock>
    )
  }
}
