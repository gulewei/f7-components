// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import CSSTransition from '../../animation'
import cc from 'classnames'

/**
 * @typedef {Object} PickerModalProps
 * @prop {JSX.Element} [toolbar]
 * @prop {boolean} [noColumns=false]
 * @prop {boolean} [inline=false]
 * @prop {string} [modalClass]
 * @param {PickerModalProps} props
 * @param {JSX.Element} children
 */
const PickerModal = (props, children) => {
  const {
    toolbar,
    noColumns,
    inline,
    modalClass
  } = props

  return (
    <CSSTransition enter={!inline && 'anim-slidein'} exit={!inline && 'anim-slideout'}>
      <div
        class={cc('picker-modal', modalClass, { 'picker-modal-inline': inline })}
        style={{ display: 'block' }}
      >
        {toolbar}
        <div class={cc('picker-modal-inner', { 'picker-items': !noColumns })}>
          {children}
          {!noColumns && <div key="center-highlight" class="picker-center-highlight"></div>}
        </div>
      </div>
    </CSSTransition>
  )
}

export default PickerModal
