// eslint-disable-next-line
import { h, app } from 'hyperapp'
// eslint-disable-next-line
import Mask from '../mask'
import { addClass } from '../_utils'
import './picker-modal.less'

const frame = 1000 / 60

const transitionEntry = el => {
  setTimeout(_ => addClass(el, 'modal-in'), frame)
}

/**
 * @typedef {Object} PickerModalProps
 * @prop {boolean} show
 * @prop {JSX.Element} [toolbar]
 * @prop {Fucntion} hide
 * @param {PickerModalProps} props
 * @param {JSX.Element[]} children
 */
const PickerModal = (props, children) => {
  const {
    show,
    toolbar,
    hide
  } = props

  return show && (
    <div>
      <div class="picker-modal f7c-picker" style={{ display: 'block' }} oncreate={transitionEntry}>
        {toolbar}
        {children}
      </div>
      <Mask type="picker-modal" show click={hide} />
    </div>
  )
}

export default PickerModal
