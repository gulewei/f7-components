// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Picker, { PickerToolbar, PickerToolbarLink as PickerLink } from '../components/picker'

const DEFAULT = {
  modalTypes: Picker.TYPE.columns,
  toolbar: (
    <PickerToolbar
      right={<PickerLink text="Done" />}
    />
  )
}

export default {
  state: {
    show: false,
    props: {},
    value: DEFAULT.values
  },

  actions: {
    toggle: ({ show, props }) => {
      return { show, props }
    },

    update: (value) => {
      return { value }
    }
  },

  view: (state, actions) => {
    return (
      <Picker show={state.show} {...state.props} onChange={(val) => {
        // update view
        actions.update(val)
        // emit value outside
        state.props.onChange && state.props.onChange(val)
      }} />
    )
  },

  api: (actions) => {
    return {
      open: (pickerProps) => {
        actions.toggle({
          show: true,
          props: { ...DEFAULT, ...pickerProps }
        })
      },

      close: () => {
        actions.toggle({ show: false, props: {} })
      }
    }
  }
}
