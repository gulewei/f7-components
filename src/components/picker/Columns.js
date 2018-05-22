// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import { PickerColumn, PickerDivider } from './Column'

/// <reference path="index.d.ts"/>

/**
 * @param {F7cPicker.PickerColumnsProps} props
 */
const PickerColumns = (props) => {
  const {
    cascade,
    items,
    values,
    columns,
    onChange
  } = props

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
                return prev === content.value ? prev : val
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
 * @param {boolean} cascade
 * @param {F7cPicker.Items} items
 * @param {string []} values
 * @param {F7cPicker.ColumnModel} [columns]
 * @returns {F7cPicker.FinalColumnModel[]}
 */
function modelColumn (cascade, items, values, columns) {
  const itemSet = cascade ? getCascadeDatas(items, values) : compatDatas(items)

  if (!columns) {
    return itemSet.map((items, i) => {
      return {
        content: {
          items,
          value: values[i]
        }
      }
    })
  }

  let itemIndex = 0

  return columns.map(({ isDivider, props, content }, i) => {
    return {
      isDivider,
      props,
      content: isDivider ? content : {
        items: itemSet[++itemIndex]
      }
    }
  })
}

/**
 * convert cascade items to multiple columns items
 * @param {F7cPicker.CascadeItem[]} items
 * @param {string[]} value
 * @returns {F7cPicker.ItemProps[][]}
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
 * @param {F7cPicker.ItemProps[] | F7cPicker.ItemProps[][]} data
 * @returns {F7cPicker.ItemProps[][]}
 */
function compatDatas (data) {
  return data[0].value ? data : [data]
}
