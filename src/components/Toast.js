// eslint-disable-next-line
import { h } from 'hyperapp'
import { $ } from '../utils'

const transitionEl = el => {
  const $box = $(el)

  $box.css('margin-top', $box.outerHeight() / -2 + 'px')
    .css('margin-left', $box.outerWidth() / -2 + 'px')
    .addClass('fadein')

  // requestAnimationFrame(_ => $box.addClass('fadein'))
}

const removeEl = (el, done) => {
  $(el).removeClass('fadein').transitionEnd(done)
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
