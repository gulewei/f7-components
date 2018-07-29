// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Preloader from '../preloader'
// eslint-disable-next-line
import Overlay from '../overlay'

/**
 * @typedef {Object} LoadingProps
 * @prop {boolean} show
 * @prop {string} [wraperClass='loading-wraper']
 * @prop {string} [wraperKey]
 *
 * @param {LoadingProps} props
 */
const Loading = props => {
  const {
    show,
    wraperClass = 'loading-wraper',
    wraperKey
  } = props

  return (
    <div key={wraperKey} class={wraperClass}>
      {show && [
        <Overlay
          type={Overlay.TYPES.preloader}
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
