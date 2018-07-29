// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'
// eslint-disable-next-line
import Transition from '../transition'
import { ANIM_NAMES } from '../_util'

const TYPES = {
  modal: 'modal',
  preloader: 'preloader-indicator',
  popup: 'popup',
  picker: 'picker-modal'
}

/**
 * @typedef {Object} OverlayProps
 * @prop {'modal' | 'preloader-indicator' | 'popup' | 'picker-modal'} [type='modal']
 * @prop {boolean} [notAnimated=false]
 * @prop {(e) => void} [onOverlayClick]
 * @prop {string} [key]
 * @prop {string} [overlayClass]
 * @prop {string} [enterClass='anim-fadein']
 * @prop {string} [exitClass='anim-fadeout']
 *
 * @param {OverlayProps} props
 */
const Overlay = (props) => {
  const {
    type = TYPES.modal,
    notAnimated,
    onOverlayClick,
    key,
    overlayClass,
    enterClass = ANIM_NAMES.fadeIn,
    exitClass = ANIM_NAMES.fadeOut
  } = props

  const noAnim = notAnimated || type === TYPES.preloader

  return (
    <Transition
      enter={!noAnim && enterClass}
      exit={!noAnim && exitClass}
    >
      <div
        key={key}
        class={cc(`${type}-overlay`, overlayClass)}
        onclick={onOverlayClick}
      />
    </Transition>
  )
}

Overlay.TYPES = TYPES

export default Overlay
