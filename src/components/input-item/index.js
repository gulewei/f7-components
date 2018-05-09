// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import { Item } from '../List'

/**
 * @typedef {Object} CustomInputProps
 * @prop {string} value
 * @prop {string} [type='text']
 * @prop {string} [name]
 * @prop {boolean} [disabled=false]
 * @prop {boolean} [readonly=false]
 * @prop {string} [placeholder]
 * @prop {(value: string) => void} [oninput]
 * @prop {(value: string) => void} [onchange]
 * @prop {(el: HTMLElement) => void} [onfocus]
 * @prop {(el: HTMLElement) => void} [onblur]
 * @prop {(el: HTMLElement) => void} [onInputCreate]
 * @prop {(el: HTMLElement) => void} [onInputRemove]
 * @prop {(el: HTMLElement) => void} [onInputeDestroy]
 * @param {CustomInputProps} props
 */
const CustomInput = props => {
  const {
    type = 'text',
    name,
    value,
    disabled,
    readonly,
    placeholder,
    oninput,
    onchange,
    onfocus,
    onblur,
    onInputCreate,
    onInputRemove,
    onInputeDestroy
  } = props

  return (
    <input
      {...{ type, name, value, disabled, readonly, placeholder }}
      class="f7c-custom-input"
      oninput={oninput && (e => oninput(e.target.value))}
      onchange={onchange && (e => onchange(e.target.value))}
      onfocus={onfocus && (e => onfocus(e.target))}
      onblur={onblur && (e => onblur(e.target))}
      oncreat={onInputCreate}
      onremove={onInputRemove}
      ondestroy={onInputeDestroy}
    />
  )
}

/**
 * @param {CustomInputProps} props
 * @param {JSX.Element[]} children
 */
const InputItem = (props, children) => {
  return (
    <Item
      {...props}
      input={
        <CustomInput {...props} />
      }
    >{children}</Item>
  )
}

export default InputItem

export {
  CustomInput
}
