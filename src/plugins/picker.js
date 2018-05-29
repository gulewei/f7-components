// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Picker, { PickerToolbar, PickerToolbarLink as PickerLink } from '../components/picker'

const DEFAULT = {
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
      openPicker: (pickerProps) => {
        actions.toggle({
          show: true,
          props: { ...DEFAULT, ...pickerProps }
        })
      },

      closePicker: () => {
        actions.toggle({ show: false, props: {} })
      }
    }
  }
}
