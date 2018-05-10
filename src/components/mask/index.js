// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import cc from 'classnames'
import { addClass, requestAnimationFrame } from '../_utils'
import './index.less'

const transitionEl = el => {
  requestAnimationFrame(_ => addClass(el, 'modal-overlay-visible'))
}

/**
 * @typedef {Object} MaskProps
 * @prop {boolean} [show=false]
 * @prop {'modal' | 'preloader-indicator' | 'popup' | 'picker-modal'} [type='modal']
 * @prop {(e) => void} [onclick]
 * @param {MaskProps} props
 */
const Mask = (props) => {
  const {
    show,
    type = 'modal',
    onclick
  } = props

  return show && (
    <div class={`${type}-overlay`} onclick={onclick} oncreate={transitionEl} ></div>
  )
}

export default Mask
