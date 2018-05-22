// eslint-disable-next-line
import { h } from 'hyperapp'
import { install } from '../utils'
import Picker, { PickerToolbar, PickerToolbarLink } from '../components/picker'

const pickerActions = install(
  {
    show: false,
    cascade: false,
    items: [],
    values: [],
    onChange: () => { }
  },
  {
    open: props => ({ ...props, show: true }),
    close: () => ({ show: false }),
    update: value => ({ value })
  },
  (state, { close, update }) => {
    return (
      <PopupPicker {...{
        ...state,
        onChange: (val) => {
          update(val)
          state.onChange(val)
        }
      }} />
    )
  },
  (actions) => actions
)

export default pickerActions
