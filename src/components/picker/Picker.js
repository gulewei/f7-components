// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Overlay from '../overlay'
// eslint-disable-next-line
import PickerModal from './Modal'
// eslint-disable-next-line
import PickerColumns from './Columns'

/// <reference path="index.d.ts"/>

/**
 * @typedef {Object} PickerProps
 * @prop {boolean} show
 * @prop {(e: Event) => void} [onOverlayClick]
 * @prop {string} [modalClass]
 * @prop {JSX.Element} [toolbar]
 * @prop {boolean} [cascade]
 * @prop {*[]} items
 * @prop {string[]} values
 * @prop {*[]} [columns]
 * @prop {(values: string[]) => void} onChange
 * @param {PickerProps} props
 * @param {JSX.Element} children
 */
function Picker (props, children) {
  const {
    show,
    onOverlayClick,
    modalClass,
    toolbar,
    ...columnsProps
  } = props

  return (
    <div>
      {show && [
        <Overlay type={Overlay.TYPE.picker} onOverlayClick={onOverlayClick} />,
        <PickerModal {...{ modalClass, toolbar }}>
          <PickerColumns {...columnsProps} />
        </PickerModal>
      ]}
    </div>
  )
}

export const ContentPicker = (props, children) => {
  const {
    show,
    onOverlayClick,
    modalClass,
    toolbar
  } = props

  return (
    <div>
      {show && [
        <Overlay type={Overlay.TYPE.picker} onOverlayClick={onOverlayClick} />,
        <PickerModal {...{ modalClass, toolbar, noColumns: true }}>
          {children}
        </PickerModal>
      ]}
    </div>
  )
}

export const InliePicker = (props) => {
  const {
    modalClass,
    toolbar,
    ...columnsProps
  } = props

  return (
    <PickerModal {...{ modalClass, toolbar, inline: true }}>
      <PickerColumns {...columnsProps} />
    </PickerModal>
  )
}

export default Picker
