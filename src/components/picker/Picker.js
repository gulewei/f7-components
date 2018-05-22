// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Overlay from '../mask'
// eslint-disable-next-line
import PickerModal from './Modal'
// eslint-disable-next-line
import PickerColumns from './Columns'

/// <reference path="index.d.ts"/>

/**
 * @param {F7cPicker.PickerProps} props
 */
const Picker = (props) => {
  const {
    show,
    onOverlayClick,
    inline,
    ...otherProps
  } = props

  return (
    <div>
      <Overlay type="picker-modal" show={show} onclick={onOverlayClick} />
      {show &&
        PickerModal(otherProps, [PickerColumns(otherProps)])
      }
    </div>
  )
}

export default Picker
