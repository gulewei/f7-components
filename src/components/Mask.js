// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import cc from 'classnames'
import { addClass } from '../utils'

const transitionEl = el => {
  window.requestAnimationFrame(_ => addClass(el, 'modal-overlay-visible'))
}

/**
 * @typedef {Object} MaskProps
 * @prop {boolean} [show=false]
 * @prop {(e) => void} [click]
 * @param {MaskProps} props
 */
export const Mask = (props) => {
  const {
    show,
    click
  } = props

  return show && (
    <div class="modal-overlay f7c-mask" onclick={click} oncreate={transitionEl} ></div>
  )
}
