import { h } from 'hyperapp'
import { ContentBlock, Preloader } from '../components'
import SvgPreloader from '../../components/preloader/svg'

export default {
  key: 'preloaders',
  title: 'Preloader',
  state: {},
  actions: {},
  view: () => {
    return (
      <ContentBlock title="Preloader">
        <p>
          <Preloader />
          <span>default</span>
        </p>
        <p>
          <SvgPreloader white></SvgPreloader>
        </p>
        <p>
          <SvgPreloader color='#f5711c'></SvgPreloader>
        </p>
      </ContentBlock>
    )
  }
}
