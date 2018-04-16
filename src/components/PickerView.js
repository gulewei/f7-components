// eslint-disable-next-line
import { h } from 'hyperapp'

// eslint-disable-next-line
const PickerViewCol = props => {
  return (
    <div class="picker-items-col">
      <div class="picker-items-col-wrapper">
        {props.items.map(item => <div class="picker-item">{item.label}</div>)}
      </div>
    </div>
  )
}

/**
 * @typedef {Object} PickerViewProps
 * @prop {Object[]} data
 * @prop {string[]} [value]
 * @prop {() => void} onColChange
 * @prop {() => void} onChange
 * @prop {boolean} [inline=true]
 * @param {PickerViewProps} props
 */
export const PickerView = props => {
  const {
    data,
    inline = true
  } = props

  const pickerViewInner = (
    <div class="picker-modal-inner picker-items">
      {data.map(items => <PickerViewCol items={items} />)}
      <div class="picker-center-highlight"></div>
    </div>
  )

  return inline ? (
    <div class="picker-columns picker-modal-inline">{pickerViewInner}</div>
  ) : pickerViewInner
}
