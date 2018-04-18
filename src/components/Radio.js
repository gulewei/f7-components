// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'
// eslint-disable-next-line
import { Icon } from './Icon'

export const Radio = (
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
    <label {...r} class={cc('label-radio item-content', r.class)}>
      <input
        {...{ name, disabled, value, checked }}
        type="radio"
        onchange={e => onCheckChange(e.target.value, e)}
      />
      <div class="item-media">
        {media || <Icon name="form-radio" />}
      </div>
      <div class="item-inner">
        <div class="item-title">{title || children}</div>
      </div>
    </label>
  )
}
