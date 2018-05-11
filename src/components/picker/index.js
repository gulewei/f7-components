// eslint-disable-next-line
import { h, app } from 'hyperapp'
// eslint-disable-next-line
import { Mask } from './Mask'
// eslint-disable-next-line
import { PickerView } from './PickerView'
import { noop, install, addClass } from '../utils'
import '../css/picker.css'

const frame = 1000 / 60

const transitionEntry = el => {
  setTimeout(_ => addClass(el, 'modal-in'), frame)
}

const renderToolbar = (hide, format, onChange, value) => {
  return (
    <div class="toolbar f7c-picker-toolbar">
      <div class="toolbar-inner">
        <div class="left">
          <a href="#" class="link" onclick={hide}>取消</a>
        </div>
        <div class="right">
          <a href="#" class="link" onclick={e => {
            onChange(format(value))
            hide()
          }}>完成</a>
        </div>
      </div>
    </div>
  )
}

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
 * @param {JSX.Element[]} children
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

  return show && (
    <div>
      <div class="picker-modal f7c-picker" style={{ display: 'block' }} oncreate={transitionEntry}>
        {toolbar || renderToolbar(hide, format, onChange, value)}
        <PickerView {...{ data, value, cascade }} onColChange={values => {
          onColChange(values)
          update(values)
        }} />
      </div>
      <Mask show click={hide} />
    </div>
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
export const Picker = (props, children) => {
  if (!children[0]) {
    return false
  }

  children[0].attributes.onclick = e => {
    openPicker(props)
  }

  return children.slice(0, 1)
}
