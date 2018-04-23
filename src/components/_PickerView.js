// eslint-disable-next-line
import { h } from 'hyperapp'
import { noop, isarray } from '../utils'
import zscroller from 'zscroller'

export const PickerColumn = props => {
  const {
    data,
    value,
    onScrollChange = noop,
    onScrollEnd = noop
  } = props

  return (
    <div class="picker-items-col" oncreate={el => {
      el._scroller = new zscroller(el, {
        scrollingX: false,
        snapping: true,
        locking: false,
        penetrationDeceleration: .1,
        minVelocityToKeepDecelerating: 0.5,
        scrollingComplete: onScrollEnd
      })

      el._scroller.setSnapSize(0, el.offsetHeight)
    }}>
      <div class="picker-items-col-wrapper">
        {data.map(item => <div class="picker-item"><span>{item.label}</span></div>)
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
export const PickerView = props => {
  const {
    data,
    value,
    onColChange = noop,
    cascade = false
  } = props

  const cols = compatData(cascade ? getCascadeData(data, value) : data)

  return (
    <div class="picker-modal picker-columns picker-modal-inline">
      <div class="picker-modal-inner picker-items">
        {cols.map((col, i) => <PickerColumn data={col} value={value[i]} />)}
        <div class="picker-center-highlight"></div>
      </div>
    </div>
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
