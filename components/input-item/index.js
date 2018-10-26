import { h } from 'hyperapp'
import List from '../list'

export default (props, children) => {
  const {
    type = 'text',
    value,
    placeholder,
    disabled,
    readonly,
    name,
    onChange,
    onFocus,
    onBlur,
    inputProps,
    ...rest
  } = props
  return (
    <List.Item
      {...rest}
      input={
        <input
          {...{ ...inputProps, type, value, placeholder, disabled, readonly, name }}
          oninput={onChange && (
            e => {
              onChange(e.target.value)
            }
          )}
          onfoucs={onFocus}
          onblur={onBlur}
        />
      }
    >
      {children}
    </List.Item>
  )
}
