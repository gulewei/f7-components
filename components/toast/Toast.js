// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Overlay, { enumOverlayTypes } from '../overlay'
// eslint-disable-next-line
import CSSTransition from '../animation'
import { sizeEl, ANIM_NAMES } from '../_util'
import cc from 'classnames'

const WRAPER = 'toast-wraper'

/**
 * @typedef {Object} ToastProps
 * @prop {boolean} show
 * @prop {string} msg
 * @prop {Function} [onToastClick]
 * @prop {string} [toastClass]
 * @prop {string | false} [enterClass="anim-fadein"]
 * @prop {string | false} [exitClass="anim-fadeout"]
 * @prop {string} [wraperClass='toast-wraper']
 * @prop {string} [wraperKey]
 *
 * @param {ToastProps} props
 */
const Toast = (props) => {
  const {
    show,
    msg,
    toastClass,
    onToastClick,
    enterClass = ANIM_NAMES.fadeIn,
    exitClass = ANIM_NAMES.fadeOut,
    wraperClass = WRAPER,
    wraperKey
  } = props

  return (
    <div key={wraperKey} class={wraperClass}>
      {show && [
        <Overlay
          type={enumOverlayTypes.preloader}
          notAnimated
        />,
        <CSSTransition
          enter={enterClass}
          exit={exitClass}
          beforeEnter={el => {
            sizeEl(el, true, true)
          }}
        >
          <div
            class={cc('toast toast-transition', toastClass)}
            onclick={onToastClick}
          >
            {msg}
          </div>
        </CSSTransition>
      ]}
    </div>
  )
}

export default Toast
