import { h } from 'hyperapp'
import Overlay from '../overlay'
import PickerModal from './Modal'
import PickerColumns from './Columns'
import cc from 'classnames'

/**
 * @typedef {Object} PickerItem
 * @prop {string} label
 * @prop {string} value
 * @prop {PickerItem[]} [children]
 *
 * @typedef {Object} PickerColumn
 * @prop {boolean} [isDivider]
 * @prop {string} [content]
 * @prop {string} [class]
 * @prop {string} [key]
 * @prop {number} [width]
 * @prop {'left' | 'center'} [align]
 *
 * @typedef {Object} PickerProps
 * @prop {boolean} show
 * @prop {string} [wraperClass='picker-wraper']
 * @prop {string} [wraperKey]
 * @prop {(e: Event) => void} [onOverlayClick]
 * @prop {string} [modalClass]
 * @prop {JSX.Element} [toolbar]
 * @prop {boolean} [cascade]
 * @prop {PickerItem[]} items
 * @prop {string[]} values
 * @prop {PickerColumn[]} [columns]
 * @prop {(values: string[]) => void} onChange
 *
 * @param {PickerProps} props
 * @param {JSX.Element} children
 */
export const Picker = (props) => {
  const {
    show,
    wraperClass,
    wraperKey,
    onOverlayClick,
    modalClass,
    toolbar,
    onOpen,
    onClose,
    ...columnsProps
  } = props

  return (
    <div key={wraperKey} class={cc('protal-picker', wraperClass)}>
      {show && [
        <Overlay type={Overlay.TYPES.picker} onOverlayClick={onOverlayClick} />,
        <PickerModal {...{ modalClass, toolbar, onOpen, onClose }}>
          <PickerColumns {...columnsProps} />
        </PickerModal>
      ]}
    </div>
  )
}

export const ModalPicker = (props, children) => {
  const {
    show,
    wraperClass,
    wraperKey,
    onOverlayClick,
    modalClass,
    onOpen,
    onClose,
    toolbar
  } = props

  return (
    <div key={wraperKey} class={wraperClass}>
      {show && [
        <Overlay type={Overlay.TYPES.picker} onOverlayClick={onOverlayClick} />,
        <PickerModal {...{ modalClass, toolbar, noColumns: true, onOpen, onClose }}>
          {children}
        </PickerModal>
      ]}
    </div>
  )
}

export const InlinePicker = (props) => {
  const {
    modalClass,
    onOpen,
    onClose,
    toolbar,
    ...columnsProps
  } = props

  return (
    <PickerModal {...{ modalClass, toolbar, inline: true, onOpen, onClose }}>
      <PickerColumns {...columnsProps} />
    </PickerModal>
  )
}
