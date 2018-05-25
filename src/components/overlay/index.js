// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'
import './index.less'

/**
 * @typedef {Object} MaskProps
 * @prop {'modal' | 'preloader-indicator' | 'popup' | 'picker-modal'} [type='modal']
 * @prop {(e) => void} [onOverlayClick]
 * @prop {string} [key]
 * @prop {string} [class]
 * @param {MaskProps} props
 */
const Overlay = (props) => {
  const {
    type = 'modal',
    onOverlayClick,
    ...rest
  } = props

  return (
    <div {...rest}
      class={cc(`${type}-overlay`, props.class)}
      onclick={onOverlayClick}
    />
  )
}

export default Overlay
