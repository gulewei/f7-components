// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import { PickerColumn, PickerDivider } from './Column'

/**
 * @typedef {Object} PickerItem
 * @prop {string} label
 * @prop {string} value
 * @prop {PickerItem[]} [children]
 *
 * @typedef {Object} PickerColumnTypes
 * @prop {boolean} [isDivider]
 * @prop {string} [content]
 * @prop {string} [class]
 * @prop {string} [key]
 * @prop {number} [width]
 * @prop {'left' | 'center'} [align]
 *
 * @typedef {Object} PickerColumnsProps
 * @prop {boolean} [cascade]
 * @prop {PickerItem[]} items
 * @prop {string[]} values
 * @prop {(values: string[]) => void} onChange
 * @prop {PickerColumn[]} [columns]
 *
 * @param {PickerColumnsProps} props
 */
const PickerColumns = (props) => {
  const {
    cascade,
    items,
    values,
    columns,
    onChange
  } = props

  if (!items || !values) {
    return false
  }

  const models = modelColumn(cascade, items, values, columns)

  return (
    models.map(({ isDivider, props, content }, i) => {
      return (
        isDivider
          ? <PickerDivider {...{ ...props, content }} />
          : <PickerColumn
            {... { ...props, ...content }}
            onChange={val => {
              const newValues = values.map(prev => {
                return prev === content.value ? val : prev
              })
              onChange(newValues)
            }}
          />
      )
    })
  )
}

export default PickerColumns

/**
 * final column model
 *
 * @typedef {Object} FinalColumnModel
 * @prop {boolean} [isDivider]
 * @prop {string | {items: PickerItem[], value: string}} [content]
 * @prop {PickerColumnTypes} [props]
 *
 * @param {boolean} cascade
 * @param {PickerItem[]} items
 * @param {string []} values
 * @param {PickerColumnTypes[]} [columns]
 *
 */
function modelColumn (cascade, items, values, columns) {
  const datas = cascade ? getCascadeDatas(items, values) : compatDatas(items)

  const contents = datas.map((items, i) => {
    return {
      items,
      value: values[i]
    }
  })

  if (!columns) {
    return contents.map(content => ({ content }))
  }

  let itemIndex = 0
  return columns.map(({ isDivider, content, ...props }, i) => {
    return {
      isDivider,
      props,
      content: isDivider ? content : contents[++itemIndex]
    }
  })
}

/**
 * convert cascade items to multiple columns items
 * @param {PickerItem[]} items
 * @param {string[]} value
 * @returns {PickerItem[][]}
 */
function getCascadeDatas (items, value) {
  const f = (data, [val, ...restVals], acc) => {
    const selected = data.filter(item => item.value === val).pop()

    return restVals.length > 0
      ? f(
        selected.children,
        restVals,
        acc.concat([
          data.map(({ label, value }) => ({ label, value }))
        ])
      )
      : acc.concat([data])
  }
  return f(items, value, [])
}

/**
 * campat items between single column and multiple columns
 * @param {PickerItem[] | PickerItem[][]} data
 * @returns {PickerItem[][]}
 */
function compatDatas (data) {
  return data[0].value ? [data] : data
}
