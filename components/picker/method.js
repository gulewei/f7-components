/* eslint-disable no-unused-vars */
import { Picker, ModalPicker } from './Picker'
import PickerToolbar from './Toolbar'
import { h } from 'hyperapp'
/* eslint-enable no-unused-vars */
import { createApp } from '../_util'

let CONFIG = {
  okText: 'Done',
  cancelText: '',
  title: ''
}

function config (config) {
  CONFIG = {
    ...CONFIG,
    ...config
  }
}

const getView = (Container, content, toolbar) => (state, actions) => {
  return (
    <Container
      {...state}
      onChange={(values) => {
        actions.updateValues(values)
        actions.onChange(values)
      }}
      onOverlayClick={actions.onOverlayClick || actions.close}
      toolbar={toolbar || (
        <PickerToolbar
          {...state.toolbar}
          onCancel={() => {
            actions.close()
            actions.onCancel(state.values)
          }}
          onOk={() => {
            actions.close()
            actions.onOk(state.values)
          }}
        >
        </PickerToolbar>
      )}
      onOpen={actions.onOpen}
      onClose={(el) => {
        actions.onClose(el)
        actions.destroy()
      }}
    >
      {content}
    </Container>
  )
}

const createPicker = (Container) => (props) => {
  const {
    content,
    toolbar,
    title,
    okText,
    cancelText,
    toolbarClass,
    onOk,
    onCancel,
    onOverlayClick,
    onChange,
    onOpen,
    onClose,
    ...state
  } = props
  return createApp(
    (destroy) => {
      return [
        {
          ...state,
          toolbar: {
            title,
            okText,
            cancelText,
            toolbarClass
          },
          show: true
        },
        {
          close: () => {
            return { show: false }
          },
          updateValues: (values) => {
            return { values }
          },
          destroy,
          onOk,
          onCancel,
          onOverlayClick,
          onChange,
          onOpen,
          onClose
        },
        getView(Container, content, toolbar)
      ]
    }
  ).close
}

export default {
  config,
  open: createPicker(Picker),
  modal: createPicker(ModalPicker)
}
