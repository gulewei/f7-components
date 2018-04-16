// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import { Mask } from './Mask'
import { $ } from '../utils'

const transitionEntry = el => {
  $(el).show()

  requestAnimationFrame(_ => $(el).addClass('modal-in'))
}

// eslint-disable-next-line
const PickerToolbar = props => {
  return (
    <div class="toolbar eapp-toolbar">
      <div class="toolbar-inner">
        <div class="left">
          <a href="#" class="link close-picker">取消</a>
        </div>
        <div class="right">
          <a href="#" class="link close-picker picker-done">完成</a>
        </div>
      </div>
    </div>
  )
}

// eslint-disable-next-line
const PickerCol = props => {
  return (
    <div class="picker-items-col">
      <div class="picker-items-col-wrapper">
        {props.col.map(item => (
          <div class="picker-item">{item}</div>
        ))
        }
      </div>
    </div>
  )
}

/**
 * @typedef {Object} PickerColProps
 * @prop {}
 * @typedef {Object} PickerProps
 * @prop {boolean} [show=false]
 * @prop {Object[]} [data=[]]
 * @prop {() => void} hide
 * @prop {() => void} updatePickerData
 * @prop {(values: string[]) => string} [format]
 * @prop {(value) => void} [onPickerChange]
 * @prop {() => void} [onColChange]
 * @prop {JSX.Element} [toolbar]
 * @param {PickerProps} props
 * @param {JSX.Element[]} children
 */
export const Picker = (props) => {
  const {
    show = false,
    hide,
    data = [],
    toolbar
  } = props

  return show && (
    <div>
      <div class="picker-modal" oncreate={transitionEntry}>
        {toolbar || <PickerToolbar />}
        <div class="picker-modal-inner picker-items">
          {data.map(col => (
            <PickerCol col={col} />
          ))
          }
          <div class="picker-center-highlight"></div>
        </div>
        <div class="picker-bottom"></div>
      </div>
      <Mask show click={hide} />
    </div>
  )
}
