import { h } from 'hyperapp'
import cc from 'classnames'
import List from '../list'

export default (props, children) => {
  const {
    type = 'text',
    value,
    placeholder,
    disabled,
    readonly,
    name,
    onChange = () => { },
    onFocus = () => { },
    onBlur = () => { },
    inputProps,
    ...rest
  } = props
  return (
    <List.Item
      {...rest}
      input={
        <input
          {...{ ...inputProps, type, value, placeholder, disabled, readonly, name }}
          oninput={e => onChange(e.target.value)}
          onfoucs={e => onFocus(e.target.value)}
          onblur={e => onBlur(e.target.value)}
        />
      }
    >
      {children}
    </List.Item>
  )
}
