// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'
// eslint-disable-next-line
import Icon from '../img-icon'
// eslint-disable-next-line
import List from '../list'

const checkboxIcon = <Icon name="form-checkbox" />

/**
 * @typedef {Object} CheckboxItemProps
 * @prop {boolean} checked
 * @prop {(checked: boolean) => any} onChange
 * @prop {string} [name]
 * @prop {boolean} [disabled]
 * @prop {boolean} [readonly]
 * @prop {Object} [checkboxProps]
 * @prop {Object} [checkboxMedia]
 *
 * @param {CheckboxItemProps} props
 * @param {JSX.Element[]} children
 */
const CheckboxItem = (props, children) => {
  const {
    checked,
    onChange = () => { },
    name,
    disabled,
    readonly,
    checkboxProps,
    checkboxMedia = checkboxIcon,
    ...rests
  } = props

  return (
    <List.Item
      {...rests}
      useLabel
      class={cc('label-checkbox', rests.class)}
      media={checkboxMedia}
      contentStart={
        <input
          {...{ ...checkboxProps, checked, name, disabled, readonly }}
          onchange={e => onChange(e.target.checked)}
          type="checkbox"
          key="_content-start"
        />
      }
    >
      {children}
    </List.Item>
  )
}

export default CheckboxItem
