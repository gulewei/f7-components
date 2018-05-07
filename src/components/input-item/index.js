// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import { Item } from '../List'
import './index.less'

/**
 * @typedef {Object} InputItemProps
 * @prop {string} [key]
 * @prop {string} [wraperClass]
 * @prop {string} [name]
 * @prop {string} [type='text']
 * @prop {boolean} [disabled=false],
 * @prop {string} value
 * @prop {string} placeholder
 * @prop {(val: string, e: EventTarget) => void} [onInput]
 * @prop {(e) => void} [onChange]
 * @param {InputItemProps} props
 * @param {JSX.Element[]} children
 */
const InputItem = (props, children) => {
  const {
    key,
    wraperClass,
    media,
    title,
    after,

    name,
    type = 'text',
    value,
    disabled = false,
    onInput,
    onChange,
    ...r
  } = props

  return (
    <Item
      {...{ key, media, title, after }}
      class={wraperClass}
      input={
        <input
          {...{ name, type, value, disabled, ...r }}
          class={r.class}
          oninput={e => onInput(e.target.value, e)}
          onchange={e => onChange(e.target.value, e)}
        />
      }
    >{children}</Item>
  )
}

export default InputItem
