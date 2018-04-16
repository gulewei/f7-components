// eslint-disable-next-line
import { h } from 'hyperapp'

/**
 * @typedef {Object} LoadingProps
 * @prop {boolean} [show=false]
 * @param {LoadingProps} props
 */
export const Loading = props => {
  return props.show && (
    <div>
      <div class="preloader-indicator-overlay"></div>
      <div class="preloader-indicator-modal">
        <span class="preloader preloader-white"></span>
      </div>
    </div>
  )
}
