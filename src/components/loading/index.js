// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Preloader from '../preloader'
// eslint-disable-next-line
import Mask from '../mask'
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
        <Mask show type='preloader-indicator' />,
        <div class="preloader-indicator-modal">
          <Preloader white />
        </div>
      ]}
    </div>
  )
}

export default Loading
