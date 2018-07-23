import { h } from 'hyperapp'
import cc from 'classnames'

/**
 * @typedef {Object} SwitchProps
 * @prop {boolean} checked
 * @prop {(checked: boolean) => any} onChange
 * @prop {boolean} [disabled]
 * @prop {string} [name]
 *
 */
export default (props) => {
  const {
    checked,
    onChange = () => { },
    disabled,
    name,
    wraperClass,
    ...rests
  } = props

  return (
    <label
      {...rests}
      class={cc('label-switch', wraperClass)}
    >
      <input
        {...{ checked, disabled, name }}
        onchange={e => onChange(e.target.checked)}
        type="checkbox"
      />
      <div class="checkbox"></div>
    </label>
  )
}
