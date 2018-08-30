/* eslint-disable no-unused-vars */
import { Picker, ModalPicker } from './Picker'
import PickerToolbar from './Toolbar'
import { h, app } from 'hyperapp'
import { createElement } from '../_util'

const OK_TEXT = 'Done'

const ACTIONS = {
  close: () => {
    return { show: false }
  },
  setValues: (values) => {
    return { values }
  }
}

const renderToolbar = ({ toolbarClass, title, okText = OK_TEXT, cancelText, onOk, onCancel }, close, values) => {
  return (
    <PickerToolbar
      toolbarClass={toolbarClass}
      title={title}
      okText={okText}
      cancelText={cancelText}
      onCancel={() => {
        onCancel && onCancel(values)
        cancelText && close()
      }}
      onOk={() => {
        onOk && onOk(values)
        close()
      }}
    />
  )
}

const getProps = ({ onOverlayClick, modalClass, onOpen, onClose }, remove, close) => {
  return {
    onOverlayClick: onOverlayClick || close,
    modalClass,
    onOpen,
    onClose: (el) => {
      onClose && onClose(el)
      remove()
    }
  }
}

function open (props) {
  const {
    // column
    items,
    cascade,
    columns,
    values,
    onChange,
    toolbar,
    ...rests
  } = props
  const { div, remove } = createElement()
  return app(
    {
      show: true,
      values
    },
    ACTIONS,
    (state, actions) => {
      const {
        show,
        values
      } = state
      const {
        setValues,
        close
      } = actions
      return (
        <Picker
          show={show}
          items={items}
          cascade={cascade}
          columns={columns}
          values={values}
          onChange={(newValue) => {
            onChange && onChange(newValue)
            setValues(newValue)
          }}
          toolbar={toolbar || renderToolbar(rests, close, values)}
          {...getProps(rests, remove, close)}
        >
        </Picker>
      )
    },
    div
  )
}

function modal (props) {
  const {
    content,
    toolbar,
    ...rests
  } = props
  const { div, remove } = createElement()
  return app(
    { show: true },
    { close: ACTIONS.close },
    (state, actions) => {
      return (
        <ModalPicker
          show={state.show}
          toolbar={toolbar || renderToolbar(rests, actions.close)}
          {...getProps(rests, remove, actions.close)}
        >
          {content}
        </ModalPicker>
      )
    },
    div
  )
}

export default {
  open,
  modal
}
