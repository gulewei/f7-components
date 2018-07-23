import { h } from 'hyperapp'
import { ListItem } from '../list'
import { resizableTextarea } from './resizable'
import cc from 'classnames'

export { resizableTextarea }

export default (props, children) => {
  const {
    value,
    placeholder,
    rows,
    disabled,
    readonly,
    maxlength,
    onChange = () => { },
    onFocus = () => { },
    onBlur = () => { },
    resizable,
    textareaProps = {},
    ...rest
  } = props

  return (
    <ListItem
      {...rest}
      input={
        <textarea
          {...{ ...textareaProps, placeholder, rows, disabled, readonly, maxlength }}
          class={cc({ resizable })}
          onchange={e => onChange(e.target.value)}
          onfoucs={e => onFocus(e.target.value)}
          onblur={e => onBlur(e.target.value)}
          oncreate={el => {
            resizable && resizableTextarea(el)
            textareaProps.oncreate && textareaProps.oncreate(el)
          }}
        >
          {value}
        </textarea>
      }
    >
      {children}
    </ListItem>
  )
}
