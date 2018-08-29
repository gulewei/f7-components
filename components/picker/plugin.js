/* eslint-disable no-unused-vars */
import { Picker, ModalPicker } from './Picker'
import PickerToolbar from './Toolbar'
import { h } from 'hyperapp'
/* eslint-enable no-unused-vars */

const state = {
  // internal
  isColumnPicker: true,
  // extra props
  content: null,
  // toolbarText: 'Done',
  // onDone: () => { },
  toolbarClass: '',
  okText: 'Done',
  cancelText: '',
  onOk: () => { },
  onCancel: () => { },
  // wraper
  show: false,
  wraperClass: '',
  wraperKey: '',
  onOverlayClick: null,
  // modal
  modalClass: '',
  toolbar: null,
  // columns
  cascade: false,
  items: [],
  values: [],
  columns: null,
  onChange: () => { }
}

const actions = {
  changValue: (values) => {
    return { values }
  },
  open: (props) => {
    return {
      ...props,
      show: true,
      isColumnPicker: true
    }
  },
  openModal: (props) => {
    return {
      ...props,
      show: true,
      isColumnPicker: false
    }
  },
  close: () => {
    return state
  },
  readState: (reader) => (state) => {
    reader(state)
  }
}

const view = (state, actions) => {
  const {
    isColumnPicker,
    content,
    toolbarClass,
    okText,
    cancelText,
    onOk,
    onCancel,
    onOverlayClick,
    toolbar,
    onChange,
    values,
    ...rest
  } = state

  const handleOverlayClick = onOverlayClick || actions.close
  const toolbarVNode = toolbar || (
    <PickerToolbar
      toolbarClass={toolbarClass}
      left={
        <a
          class="link"
          onclick={() => {
            actions.close()
            onCancel(values)
          }}
        >
          {cancelText}
        </a>
      }
      right={
        <a
          class="link"
          onclick={() => {
            actions.close()
            onOk(values)
          }}
        >
          {okText}
        </a>
      }
    >
    </PickerToolbar>
  )

  return (
    isColumnPicker
      ? (
        <Picker
          {...rest}
          values={values}
          onOverlayClick={handleOverlayClick}
          toolbar={toolbarVNode}
          onChange={(values) => {
            actions.changValue(values)
            onChange(values)
          }}
        />
      )
      : (
        <ModalPicker
          {...rest}
          onOverlayClick={handleOverlayClick}
          toolbar={toolbarVNode}
        >
          {content}
        </ModalPicker>
      )
  )
}

const api = ({ open, openModal, close, readState }) => {
  let methods = { open, openModal, close }
  // for debug only
  let internalState
  Object.defineProperty(methods, 'internalState', {
    get () {
      readState(state => { internalState = state })
      return { ...internalState }
    }
  })
  return methods
}

export default {
  state,
  actions,
  view,
  api
}
