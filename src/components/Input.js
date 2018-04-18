// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import { Item } from './List'

/**
 * @typedef {Object} InputItemProps
 * @prop {string} [name]
 * @prop {string} [type='text']
 * @prop {string} [value]
 * @prop {boolean} [disabled=false],
 * @prop {(val: string, e: EventTarget) => void} [onValueChange]
 * @prop {(e) => void} [onInputChange]
 * @prop {(e) => void} [onInputClick]
 * @prop {(e) => void} [onInputFocus]
 * @prop {(e) => void} [onInputBlur]
 * @param {InputItemProps} props
 * @param {JSX.Element[]} children
 */
export const InputItem = (props, children) => {
  const {
    name,
    type = 'text',
    value,
    disabled = false,
    pattern,
    onValueChange,
    onInputChange,
    onInputClick,
    onInputFocus,
    onInputBlur,
    ...r
  } = props

  return (
    <Item
      {...r}
      input={
        <input
          {...{ name, type, value, disabled, pattern }}
          oninput={e => onValueChange(e.target.value, e)}
          onchange={onInputChange}
          onclick={onInputClick}
          onfocus={onInputFocus}
          onblur={onInputBlur}
        />
      }
    >{children}</Item>
  )
}
