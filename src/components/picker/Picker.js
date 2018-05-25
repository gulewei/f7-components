// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Overlay from '../overlay'
// eslint-disable-next-line
import PickerModal from './Modal'
// eslint-disable-next-line
import PickerColumns from './Columns'
// eslint-disable-next-line
import { CSSTransition } from '../../animation'

/// <reference path="index.d.ts"/>

const MODAL = {
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

  const inline = modalType === MODAL.inline
  const noColumns = modalType === MODAL.no

  return (
    <div>
      {show && [
        <CSSTransition enter="anim-fadein">
          <Overlay type="picker-modal" onOverlayClick={onOverlayClick} />
        </CSSTransition>,
        <CSSTransition enter="anim-slidein" exit="anim-slideout">
          <PickerModal {...{ inline, noColumns, modalClass, toolbar }}>
            {noColumns ? children : PickerColumns(props)}
          </PickerModal>
        </CSSTransition>
      ]}
    </div>
  )
}

Picker.TYPES = MODAL

export default Picker
