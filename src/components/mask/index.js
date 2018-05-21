// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import cc from 'classnames'
import { addClass, requestAnimationFrame } from '../_utils'
import './index.less'

const transitionEl = el => {
  // TODO: transition doesn't work when use requestAinmationFrame
  // requestAnimationFrame(_ => addClass(el, 'modal-overlay-visible'))
  setTimeout(_ => addClass(el, 'modal-overlay-visible'), 0)
}

/**
 * @typedef {Object} MaskProps
 * @prop {boolean} [show=false]
 * @prop {'modal' | 'preloader-indicator' | 'popup' | 'picker-modal'} [type='modal']
 * @prop {boolean} [noAinmation=false]
 * @prop {(e) => void} [onclick]
 * @prop {string} [key]
 * @param {MaskProps} props
 */
const Mask = (props) => {
  const {
    show = false,
    type = 'modal',
    noAinmation,
    oncreate,
    ...rest
  } = props

  const visible = type !== 'preloader-indicator'

  return show && (
    <div
      {...rest}
      class={cc(`${type}-overlay`, rest.class, {
        'not-animated': noAinmation
      })}
      oncreate={el => {
        visible && transitionEl(el)
        oncreate && oncreate(el)
      }}
    ></div >
  )
}

export default Mask
