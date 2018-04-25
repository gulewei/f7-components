// eslint-disable-next-line
import { h } from 'hyperapp'
import { $, addClass, removeClass, css, on } from '../utils'

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
export const Toast = (props) => {
  const {
    show = false,
    close,
    msg,
    duration
  } = props

  return show && (
    <div class="toast show" oncreate={el => {
      transitionEl(el)
      setTimeout(close, duration)
    }} onremove={removeEl}>{msg}</div>
  )
}
