// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Overlay from '../overlay'
// eslint-disable-next-line
import PickerModal from './Modal'
// eslint-disable-next-line
import PickerColumns from './Columns'

/// <reference path="index.d.ts"/>

const TYPE = {
  columns: 'columns',
  inline: 'inline-columns',
  no: 'no-column'
}

/**
 * @typedef {Object} PickerProps
 * @prop {boolean} show
 * @prop {(e: Event) => void} [onOverlayClick]
 * @prop {'columns' | 'inline-columns' | 'no-column'} modalType
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
    modalType,
    modalClass,
    toolbar
  } = props

  const inline = modalType === TYPE.inline
  const noColumns = modalType === TYPE.no

  return (
    <div>
      {show && [
        <Overlay type={Overlay.TYPE.picker} onOverlayClick={onOverlayClick} />,
        <PickerModal {...{ inline, noColumns, modalClass, toolbar }}>
          {noColumns ? children : PickerColumns(props)}
        </PickerModal>
      ]}
    </div>
  )
}

Picker.TYPE = TYPE

export default Picker
