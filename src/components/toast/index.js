// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Overlay from '../overlay'
// eslint-disable-next-line
import CSSTransition from '../../animation'
// import anim from '../_utils/animations'
import { css } from '../_utils'
import cc from 'classnames'
import './index.css'

/**
 *
 * @param {HTMLElement} el
 */
const sizeEl = el => {
  css(el, {
    'margin-top': `${el.offsetHeight / -2}px`,
    'margin-left': `${el.offsetWidth / -2}px`
  })
}
/**
 * @typedef {Object} ToastProps
 * @prop {boolean} [show=false]
 * @prop {string} msg
 * @prop {string} class
 * @param {ToastProps} props
 */
const Toast = (props) => {
  const {
    show = false,
    msg
  } = props

  return (
    <div>
      {show && [
        <CSSTransition enter="anim-fadein" exit="anim-fadeout">
          <div class={cc('toast', props.class)} oncreate={sizeEl}>{msg}</div>
        </CSSTransition>,
        <Overlay type={Overlay.TYPE.prelader} notAnimated />
      ]}
    </div>
  )
}

export default Toast
