// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Mask from '../mask'
import { css } from '../_utils'
import anim from '../_utils/animations'
import cc from 'classnames'
import './index.css'

/**
 *
 * @param {HTMLElement} el
 */
const transitionEl = el => {
  css(el, {
    'margin-top': `${el.offsetHeight / -2}px`,
    'margin-left': `${el.offsetWidth / -2}px`
  })

  // addClass(el, 'fadein')
  anim.enter(el, '', 'fadein')
}

const removeEl = (el, done) => {
  // on(el, 'transitionend', done)
  // on(el, 'webkitTransitionEnd', done)
  // removeClass(el, 'fadein')
  anim.exit(el, '', 'fadeout', done)
}

/**
 * @typedef {Object} ToastProps
 * @prop {boolean} [show=false]
 * @prop {string} msg
 * @param {ToastProps} props
 */
const Toast = (props) => {
  const {
    show = false,
    msg,
    oncreate,
    onremove,
    ...rest
  } = props

  return (
    <div>
      {show && [
        <div {...rest}
          class={cc('toast', rest.class)}
          oncreate={el => {
            transitionEl(el)
            oncreate && oncreate(el)
          }}
          onremove={(el, done) => {
            removeEl(el, done)
            onremove && onremove(el, done)
          }}
        >{msg}</div>,
        <Mask type="preloader-indicator" show invisible />
      ]}
    </div>
  )
}

export default Toast
