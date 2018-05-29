// eslint-disable-next-line
import { h } from 'hyperapp'
import ScrollHandler from './scroll-handler'
import cc from 'classnames'

const processWidth = (width) => {
  return parseInt(width, 10) === width ? `${width}px` : ''
}

/**
 * @typedef {Object} PickerDividerProps
 * @prop {string | JSX.Element} content
 * @prop {number} [width]
 * @prop {string} [class]
 * @prop {string} [key]
 *
 * @param {PickerDividerProps} props
 */
const PickerDivider = (props) => {
  const {
    content,
    width,
    key
  } = props

  return (
    <div
      key={key}
      class={cc('picker-items-col picker-items-col-divider', props.class)}
      style={{ width: processWidth(width) }}
    >{content}</div>
  )
}

/**
 * Picker-Column must be controlled
 *
 * @typedef {Object} PickerItemProps
 * @prop {string} label
 * @prop {string} value
 *
 * @typedef {Object} PickerColumnProps
 * @prop {string} value
 * @prop {PickerItemProps[]} items
 * @prop {(value: string) => void} onChange
 * @prop {'left' | 'center' | 'right'} [align='right']
 * @prop {number} [width]
 * @prop {string} [class]
 * @prop {string} [key]
 *
 * @param {PickerColumnProps} props
 */
const PickerColumn = (props) => {
  const {
    value,
    items,
    align,
    onChange,
    width = '',
    key
  } = props

  const columnCls = cc('picker-items-col', props.class, { [`picker-items-col-${align}`]: align })

  return (
    <div
      key={key}
      class={columnCls}
      style={{ width: processWidth(width) }}
    >
      <div
        class="picker-items-col-wrapper"
        onupdate={(el) => {
          if (el._scroller) {
            try {
              el._scroller.update({ items, value, onChange })
            } catch (e) { }
          }
        }}
        oncreate={el => {
          el._scroller = new ScrollHandler(el, { items, value, onChange })
        }}
        ondestroy={el => {
          el._scroller && (el._scroller = null)
        }}
      >
        {
          items.map((item) => {
            return (
              <div class={cc('picker-item', { 'picker-selected': item.value === value })}>
                <span>{item.label}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export {
  PickerColumn,
  PickerDivider
}
