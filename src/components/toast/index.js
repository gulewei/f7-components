// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Overlay from '../overlay'
// eslint-disable-next-line
import CSSTransition from '../../animation'
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
 * @typedef {Object} ToastElProps
 * @prop {string} msg
 * @prop {Function} [onToastClick]
 * @prop {string} [toastClass]
 * @prop {string | false} [enterClass="anim-fadein"]
 * @prop {string | false} [exitClass="anim-fadeout"]
 *
 * @param {ToastElProps} props
 */
export const ToastEl = (props) => {
  const {
    enterClass = 'anim-fadein',
    exitClass = 'anim-fadeout'
  } = props

  return (
    <CSSTransition enter={enterClass} exit={exitClass}>
      <div class={cc('toast toast-transition', props.toastClass)}
        oncreate={sizeEl}
        onclick={props.onToastClick}
      >{props.msg}</div>
    </CSSTransition>
  )
}

/**
 * @typedef {Object} ToastProps
 * @prop {boolean} show
 * @prop {string} [wraperClass='toast-wraper']
 * @prop {string} msg
 * @prop {Function} [onToastClick]
 * @prop {string} [toastClass]
 * @prop {string | false} [enterClass="anim-fadein"]
 * @prop {string | false} [exitClass="anim-fadeout"]
 *
 * @param {ToastProps} props
 */
const Toast = (props) => {
  const {
    show,
    wraperClass = 'toast-wraper',
    msg,
    toastClass,
    onToastClick,
    enterClass,
    exitClass,
    ...rest
  } = props

  return (
    <div {...rest} class={wraperClass}>
      {show && [
        <Overlay type={Overlay.TYPE.prelader} notAnimated />,
        ToastEl(props)
      ]}
    </div>
  )
}

export default Toast
