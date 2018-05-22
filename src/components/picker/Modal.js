// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'
import anim from '../_utils/animations'

/**
 * @typedef {Object} PickerModalProps
 * @prop {JSX.Element} [toolbar]
 * @prop {boolean} [noColumns=false]
 * @prop {boolean} [inline=false]
 * @prop {string} [class]
 * @param {PickerModalProps} props
 * @param {JSX.Element} children
 */
const PickerModal = (props, children) => {
  const {
    toolbar,
    noColumns,
    inline
  } = props

  return (
    <div
      class={cc('picker-modal', props.class, { 'picker-modal-inline': inline })}
      style={{ display: 'block' }}
      oncreate={el => {
        anim.enter(el, 'modal-in', '')
      }}
      onremove={(el, done) => {
        anim.exit(el, '', 'modal-out', done)
      }}
    >
      {toolbar}
      <div class={cc('picker-modal-inner', { 'picker-items': !noColumns })}>
        {children}
        {!noColumns && <div key="center-highlight" class="picker-center-highlight"></div>}
      </div>
    </div>
  )
}

export default PickerModal
