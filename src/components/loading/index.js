// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Preloader from '../preloader'
// eslint-disable-next-line
import Overlay from '../overlay'
import './index.less'

/**
 * @typedef {Object} LoadingProps
 * @prop {boolean} [show=false]
 * @param {LoadingProps} props
 */
const Loading = props => {
  return (
    <div>
      {props.show && [
        <Overlay type={Overlay.TYPE.prelader} notAnimated />,
        <div class="preloader-indicator-modal">
          <Preloader white />
        </div>
      ]}
    </div>
  )
}

export default Loading
