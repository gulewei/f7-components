// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Preloader from '../preloader'
// eslint-disable-next-line
import Overlay from '../overlay'
import './index.less'

/**
 * @typedef {Object} LoadingProps
 * @prop {boolean} show
 * @prop {string} [wraperClass='loading-wraper']
 *
 * @param {LoadingProps} props
 */
const Loading = props => {
  const {
    show,
    wraperclass = 'loading-wraper',
    ...wraperProps
  } = props

  return (
    <div {...wraperProps} class={wraperclass}>
      {show && [
        <Overlay
          type={Overlay.TYPE.preloader}
          notAnimated
        />,
        <div class="preloader-indicator-modal">
          <Preloader white />
        </div>
      ]}
    </div>
  )
}

export default Loading
