// eslint-disable-next-line
import { h, app } from 'hyperapp'
// eslint-disable-next-line
import Mask from '../mask'
// eslint-disable-next-line
import { Toolbar } from '../toolbars'
import { addClass, on, requestAnimationFrame } from '../_utils'
// import cc from 'classnames'
import './picker-modal.less'

const ENTER = 'modal-in'
const LEAVE = 'modal-out'

const enter = (el) => {
  requestAnimationFrame(() => addClass(el, ENTER))
}

const leave = (el, done) => {
  addClass(el, LEAVE)
  on(el, 'transitionend', done)
}

/**
 * @typedef {Object} PickerModalProps
 * @prop {boolean} show
 * @prop {Function} close
 * @prop {JSX.Element} [left]
 * @prop {JSX.Element} [right]
 * @prop {boolean} [pickerItems]
 * @param {PickerModalProps} props
 * @param {JSX.Element[]} children
 */
const PickerModal = (props, children) => {
  const {
    show,
    left,
    right,
    pickerItems,
    close
  } = props

  return (
    <div>
      <Mask type="picker-modal" show={show} onclick={close} />
      {show &&
        <div
          class="picker-modal f7c-picker"
          style={{ display: 'block' }}
          oncreate={enter}
          onremove={leave}
        >
          <Toolbar>
            <div class="left">{left}</div>
            <div class="right">{right}</div>
          </Toolbar>
          {pickerItems
            ? children
            : <div class="picker-modal-inner">{children}</div>
          }
        </div>
      }
    </div>
  )
}

export default PickerModal
