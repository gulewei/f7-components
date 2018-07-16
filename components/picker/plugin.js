import Picker, { ContentPicker } from './Picker'
import PickerToolbar from './Toolbar'
import { h } from 'hyperapp'

const state = {
  // internal
  isColumnPicker: true,
  // extra props
  content: null,
  toolbarText: 'Done',
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
  openPicker: (props) => {
    return {
      ...props,
      show: true,
      isColumnPicker: true
    }
  },
  openContent: (props) => {
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
    toolbarText,
    onOverlayClick,
    toolbar,
    ...rest
  } = state

  const handleOverlayClick = onOverlayClick || actions.close
  const toolbarVNode = toolbar || <PickerToolbar right={
    <a class="link" onclick={actions.close}>{toolbarText}</a>
  } />

  return (
    isColumnPicker
      ? <Picker
        {...rest}
        onOverlayClick={handleOverlayClick}
        toolbar={toolbarVNode}
      />
      : <ContentPicker
        {...rest}
        onOverlayClick={handleOverlayClick}
        toolbar={toolbarVNode}
      >{content}</ContentPicker>
  )
}

const api = ({ openPicker: open, openContent, close, readState }) => {
  let methods = { open, openContent, close }
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
