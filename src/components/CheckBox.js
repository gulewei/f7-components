// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'
// eslint-disable-next-line
import { Icon } from './Icon'

export const Checkbox = (
  {
    media,
    title,
    disabled = false,
    checked = false,
    value,
    name,
    onCheckChange = () => { },
    ...r
  },
  children
) => {
  return (
    <label {...r} class={cc('label-checkbox item-content', r.class)}>
      <input
        {...{ name, disabled, value, checked }}
        type="checkbox"
        onchange={e => onCheckChange(e.target.checked, e)}
      />
      <div class="item-media">
        {media || <Icon name="form-checkbox" />}
      </div>
      <div class="item-inner">
        <div class="item-title">{title || children}</div>
      </div>
    </label>
  )
}
