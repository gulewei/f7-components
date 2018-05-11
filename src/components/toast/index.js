// eslint-disable-next-line
import { h } from 'hyperapp'
import { addClass, removeClass, css, on } from '../_utils'
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

  addClass(el, 'fadein')
}

const removeEl = (el, done) => {
  on(el, 'transitionend', done)
  on(el, 'webkitTransitionEnd', done)
  removeClass(el, 'fadein')
}

/**
 * @typedef {Object} ToastProps
 * @prop {boolean} [show=false]
 * @prop {() => void} close
 * @prop {string} msg
 * @prop {number} [duration]
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

  return show && (
    <div
      {...rest}
      class={cc('toast show', rest.class)}
      oncreate={el => {
        transitionEl(el)
        oncreate && oncreate(el)
      }}
      onremove={(el, done) => {
        removeEl(el, done)
        onremove && onremove(el, done)
      }}
    >{msg}</div>
  )
}

export default Toast
