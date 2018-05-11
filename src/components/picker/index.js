import { install, noop } from '../_utils'
import PickerModal from './picker-modal'
import PickerView from './picker-view'
// eslint-disable-next-line
import { Toolbar } from '../toolbars'

export { PickerModal, PickerView }

/**
 * @typedef {Object} PopoverPickerProps
 * @prop {boolean} show
 * @prop {() => void} hide
 * @prop {(values) => void} update
 * @prop {Object[]} data
 * @prop {string[]} value
 * @prop {(values: string[]) => string} [format]
 * @prop {(value) => void} [onChange]
 * @prop {() => void} [onColChange]
 * @prop {JSX.Element} [toolbar]
 * @prop {boolean} [cascade=false]
 * @param {PickerProps} props
 */
export const PopoverPicker = (props) => {
  const {
    show,
    hide,
    data,
    value,
    update,
    format = vals => vals,
    onChange = noop,
    onColChange = noop,
    toolbar,
    cascade = false
  } = props

  return (
    <PickerModal
      show={show}
      hide={hide}
      toolbar={
        toolbar || renderToolbar(hide, format, onChange, value)
      }
    >
      <PickerView {...{ data, value, cascade }} onColChange={values => {
        onColChange(values)
        update(values)
      }} />
    </PickerModal>
  )
}

const renderToolbar = (hide, format, onChange, value) => {
  return (
    <Toolbar>
      <div class="left">
        <a href="#" class="link" onclick={hide}>取消</a>
      </div>
      <div class="right">
        <a href="#" class="link" onclick={e => {
          onChange(format(value))
          hide()
        }}>完成</a>
      </div>
    </Toolbar>
  )
}

const openPicker = install(
  { show: false },
  {
    open: props => ({ ...props, show: true }),
    hide: () => ({ show: false }),
    update: value => ({ value })
  },
  (state, { hide, update }) => <PopoverPicker {...state} {...{ hide, update }} />,
  ({ open }) => open
)

/**
 * @typedef {Object} PickerProps
 * @prop {Object[]} data
 * @prop {string[]} value
 * @prop {(values: string[]) => string} [format]
 * @prop {(value) => void} [onChange]
 * @prop {() => void} [onColChange]
 * @prop {JSX.Element} [toolbar]
 * @prop {boolean} [cascade=false]
 * @param {PickerProps} props
 * @param {JSX.Element[]} children
 */
const Picker = (props, children) => {
  if (!children[0]) {
    return false
  }

  children[0].attributes.onclick = e => {
    openPicker(props)
  }

  return children.slice(0, 1)
}

export default Picker
