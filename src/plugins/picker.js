// eslint-disable-next-line
import { h } from 'hyperapp'
import { install } from '../utils'
// eslint-disable-next-line
import Picker, { PickerToolbar, PickerToolbarLink as PickerLink } from '../components/picker'

const DEFAULT = {
  modalTypes: Picker.TYPES.columns,
  modalClass: '',
  cascade: false,
  toolbar: (
    <PickerToolbar
      right={<PickerLink text="Done" />}
    />
  ),
  items: [],
  values: [],
  columns: null,
  onChange: () => { }
}

const pickerActions = install(
  {
    show: false,
    props: { ...DEFAULT },
    value: DEFAULT.values
  },
  {
    toggle: ({ show, props }) => {
      return { show, props }
    },

    update: (value) => {
      return { value }
    }
  },
  (state, actions) => {
    return (
      <Picker show={state.show} {...state.props} onChange={(val) => {
        // update view
        actions.update(val)
        // emit value outside
        state.props.onChange && state.props.onChange(val)
      }} />
    )
  },
  (actions) => {
    return {
      open: (pickerProps) => {
        actions.toggle({ show: true, props: pickerProps })
      },

      close: () => {
        actions.toggle({ show: true, props: DEFAULT })
      }
    }
  }
)

export default pickerActions
