import { h } from 'hyperapp'
import cc from 'classnames'
import { Icon } from './Icon'

export const CheckBox = (
  {
    icon = false,
    disabled = false,
    checked = false,
    onchange = () => { },
    title = '',
    ...r
  },
  children
) => {
  return (
    <label
      class={cc('label-checkbox item-content', r.class)}
      {...r}
    >
      <input
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onchange={e => onchange(e.target.checked)}
      />
      <div class="item-media">
        {icon || <Icon name="form-checkbox" />}
      </div>
      <div class="item-inner">
        <div class="item-title">{title}</div>
      </div>
    </label>
  )
}