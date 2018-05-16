// eslint-disable-next-line
import { h } from 'hyperapp'
import { isarray } from '../../utils'
import { noop } from '../_utils'
import cc from 'classnames'
import EasyScroller from '../../scroller/easy-scroller'
import './picker-view.less'

/**
 * @typedef {Object} PickerItemsColsProps
 * @prop {{value: string, label: string}[]} data
 * @prop {Function} [onValueChange]
 * @prop {'left' | 'center'} [align]
 * @param {PickerItemsColsProps} props
 */
export const PickerItemsCol = (props) => {
  const {
    data,
    // onValueChange,
    align
  } = props

  return (
    <div class={cc('picker-items-col', { [`picker-items-col-${align}`]: align })}>
      <div class="picker-items-col-wrapper"
        oncreate={el => {
          el.__scroller = new EasyScroller(el, {
            scrollingX: false
          })
        }}
      >
        {
          data.map(({ label }) => {
            return (
              <div class="picker-item">
                <span>{label}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

/**
 * @typedef {Object} PickerViewProps
 * @prop {Object[]} data
 * @prop {string[]} value
 * @prop {() => void} [onColChange]
 * @prop {boolean} [cascade=false]
 * @param {PickerViewProps} props
 */
const PickerView = props => {
  const {
    data,
    value,
    onColChange = noop,
    cascade = false
  } = props

  const cols = compatData(cascade ? getCascadeData(data, value) : data)

  return (
    <div class="f7c-picker-view"
      cols={cols}
    ></div>
  )
}

/**
 * 转换级联数据
 * @typedef {Object} CascadeProps
 * @prop {string} label
 * @prop {string} value
 * @prop {CascadeProps[]} children
 * @param {CascadeProps[]} data
 * @param {string[]} value
 */
function getCascadeData (data, value) {
  const f = (data, [val, ...vals], acc) => {
    return vals.length > 0
      ? f(
        data.filter(item => item.value === val).pop().children,
        vals,
        acc.concat([
          data.map(({ label, value }) => ({ label, value }))
        ])
      )
      : acc.concat([data])
  }
  return f(data, value, [])
}

/**
 * 兼容多列与单列数据
 * @param {*} data
 */
function compatData (data) {
  return isarray(data[0]) ? data : [data]
}

/**
 * 映射为f7cols数据结构
 * @param {*} cols
 */
function mapF7Cols (cols) {
  return cols.map(col => ({
    values: col.map(item => item.value),
    displayValues: col.map(item => item.label)
  }))
}

/**
 * 检查列数据是否发生变化
 * @param {*} prev
 * @param {*} data
 */
function diffCols (prev, data) {
  const compare = (a, b) => a.label === b.label && a.value === b.value
  const compareCol = (prev, col) => col.every((item, i) => compare(item, prev[i]))

  return data.reduce(
    (acc, col, i) => compareCol(col, prev[i]) ? acc : acc.concat(i),
    []
  )
}

/**
 * 替换变更的列数据
 * @param {number[]} diff
 * @param {(values: string[], displayValues: string[]) => void} f7Cols
 */
function applyDiff (diff, f7Cols, cols) {
  diff.map(index => {
    f7Cols[index].replaceValues(
      cols[index].map(item => item.value),
      cols[index].map(item => item.label)
    )
  })
}

export default PickerView
