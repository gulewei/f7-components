import { install } from '../../utils'
import PickerModal, { PickerToolbar } from './picker-modal'
import PickerView from './picker-view'
// eslint-disable-next-line
import { h } from 'hyperapp'
import './styles'

export { PickerModal, PickerView, PickerToolbar }

/**
 * @typedef {Object} PopoverPickerProps
 * @prop {boolean} show
 * @prop {() => void} close
 * @prop {JSX.Element} [left]
 * @prop {JSX.Element} [right]
 * @prop {Object[]} data
 * @prop {string[]} value
 * @prop {(value) => void} onChange
 * @prop {boolean} [cascade=false]
 * @param {PopoverPickerProps} props
 */
export const PopoverPicker = (props) => {
  const {
    show,
    close,
    left,
    right,
    center,
    toolbarClass,
    data,
    value,
    onChange,
    cascade = false
  } = props

  return (
    <PickerModal
      show={show}
      toolbar={
        <PickerToolbar
          class={toolbarClass}
          {...{ left, right, center }}
        />
      }
      onMaskClick={close}
      pickerViewInner
    >
      <PickerView {...{ data, value, cascade, onChange }} />
    </PickerModal>
  )
}

const pickerActions = install(
  {
    show: false,
    cascade: false,
    data: [],
    value: [],
    onChange: () => { }
  },
  {
    open: props => ({ ...props, show: true }),
    close: () => ({ show: false }),
    update: value => ({ value })
  },
  (state, { close, update }) => {
    return (
      <PopoverPicker {...{
        ...state,
        close,
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
 * @param {PopoverPickerProps} props
 * @param {JSX.Element[]} children
 */
const Picker = (props, children) => {
  const child = children[0]

  if (!child) {
    return false
  }

  return child(pickerActions)
}

export default Picker
