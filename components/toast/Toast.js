// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Overlay from '../overlay'
// eslint-disable-next-line
import Transition from '../transition'
import { sizeEl, ANIM_NAMES } from '../_util'
import cc from 'classnames'

const WRAPER = 'toast-wraper'

/**
 * @typedef {Object} ToastProps
 * @prop {boolean} show
 * @prop {string} [wraperKey]
 * @prop {string} [wraperClass='toast-wraper']
 * @prop {string | false} [enterClass="anim-fadein"]
 * @prop {string | false} [exitClass="anim-fadeout"]
 * @prop {string} msg
 * @prop {string} [toastClass]
 * @prop {boolean} [mask]
 * @prop {Function} [onToastClick]
 *
 * @param {ToastProps} props
 */
const Toast = (props, children) => {
  const {
    show,
    wraperKey,
    wraperClass = WRAPER,
    enterClass = ANIM_NAMES.fadeIn,
    exitClass = ANIM_NAMES.fadeOut,
    msg = children,
    toastClass,
    mask,
    onOpen,
    onClose,
    onToastClick
  } = props

  const overlay = mask && <Overlay type={Overlay.TYPES.preloader} notAnimated />

  return (
    <div key={wraperKey} class={wraperClass}>
      {show && [
        overlay,
        <Transition
          enter={enterClass}
          exit={exitClass}
        >
          <div
            class={cc('toast', toastClass)}
            onclick={onToastClick}
            oncreate={(el) => {
              sizeEl(el, true, true)
              onOpen && onOpen(el)
            }}
            ondestroy={onClose}
          >
            {msg}
          </div>
        </Transition>
      ]}
    </div>
  )
}

export default Toast
