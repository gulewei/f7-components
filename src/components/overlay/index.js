// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'
// eslint-disable-next-line
import CSSTransition from '../../animation'
import './index.less'

const TYPE = {
  modal: 'modal',
  prelader: 'preloader-indicator',
  popup: 'popup',
  picker: 'picker-modal'
}

/**
 * @typedef {Object} MaskProps
 * @prop {'modal' | 'preloader-indicator' | 'popup' | 'picker-modal'} [type='modal']
 * @prop {boolean} [notAnimated=false]
 * @prop {(e) => void} [onOverlayClick]
 * @prop {string} [key]
 * @prop {string} [class]
 * @param {MaskProps} props
 */
function Overlay (props) {
  const {
    type = TYPE.modal,
    onOverlayClick,
    notAnimated,
    ...rest
  } = props

  const noAnim = notAnimated || type === TYPE.prelader

  return (
    <CSSTransition enter={!noAnim && 'anim-fadein'} exit={!noAnim && 'anim-fadeout'}>
      <div {...rest}
        class={cc(`${type}-overlay`, props.class)}
        onclick={onOverlayClick}
      />
    </CSSTransition>
  )
}

Overlay.TYPE = TYPE

export default Overlay
