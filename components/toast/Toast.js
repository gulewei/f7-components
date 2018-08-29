// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Transition from '../transition'
import { sizeEl, ANIM_NAMES } from '../_util'
import cc from 'classnames'

/**
 * @typedef {Object} ToastProps
 * @prop {string} [msg]
 * @prop {Function} [onToastClick]
 * @prop {string | false} [enterClass="anim-fadein"]
 * @prop {string | false} [exitClass="anim-fadeout"]
 *
 * @param {ToastProps} props
 */
const Toast = (props, children) => {
  const {
    msg = children,
    onToastClick,
    enterClass = ANIM_NAMES.fadeIn,
    exitClass = ANIM_NAMES.fadeOut,
    oncreate,
    ...rests
  } = props

  return (
    <Transition
      enter={enterClass}
      exit={exitClass}
    >
      <div
        {...rests}
        oncreate={(el) => {
          sizeEl(el, true, true)
          oncreate && oncreate(el)
        }}
        class={cc('toast', rests.class, rests.toastClass)}
        onclick={onToastClick}
      >
        {msg}
      </div>
    </Transition>
  )
}

export default Toast
