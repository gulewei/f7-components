// eslint-disable-next-line
import { h } from 'hyperapp'
import { install } from '../../utils'
import Picker from './Picker'
import PickerToolbar from './Toolbar'
import './styles'

export { Picker, PickerToolbar }

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

/**
 * @param {*} props
 * @param {JSX.Element[]} children
 */
export default (props, children) => {
  const child = children[0]

  if (!child) {
    return false
  }

  return child(pickerActions)
}
