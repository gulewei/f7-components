// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Overlay from '../overlay'
// eslint-disable-next-line
import PickerModal from './Modal'
// eslint-disable-next-line
import PickerColumns from './Columns'

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
const Picker = (props, children) => {
  const {
    show,
    wraperClass,
    wraperKey,
    modalClass,
    onOverlayClick,
    toolbar,
    ...columnsProps
  } = props

  return (
    <div key={wraperKey} class={wraperClass}>
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
    wraperClass,
    wraperKey,
    modalClass,
    onOverlayClick,
    toolbar
  } = props

  return (
    <div key={wraperKey} class={wraperClass}>
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
