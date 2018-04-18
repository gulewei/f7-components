// eslint-disable-next-line
import { h } from 'hyperapp'
import { f7app, noop, isarray } from '../utils'

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
    <div class="f7c-picker-view"
      cols={cols}
      oncreate={el => {
        el._f7c_picker = f7app.picker({
          container: el,
          cssClass: 'f7c-picker-view-column',
          value,
          cols: mapF7Cols(cols),
          toolbar: false,
          onChange: (p, values, displayValues) => onColChange(values)
        })
      }}
      onupdate={(el, oldAttr) => {
        const diff = diffCols(oldAttr.cols, cols)
        if (diff.length > 0) {
          console.log('update picker cols')
          applyDiff(diff, el._f7c_picker.cols, cols)
        }
      }}
      ondestroy={(el) => {
        el._f7c_picker.destroy()
      }}
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
