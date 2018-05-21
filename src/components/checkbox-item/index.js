// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'
// eslint-disable-next-line
import Icon from '../Icon'
// eslint-disable-next-line
import { Item } from '../list'
import './index.less'

const checkboxIcon = <Icon name="form-checkbox" />

/**
 * @typedef {Object} CheckboxItemProps
 * @prop {boolean} checked
 * @prop {string} [name]
 * @prop {boolean} [disabled]
 * @prop {(checked: boolean) => void} [onchange]
 * @prop {JSX.Element} [media]
 * @param {CheckboxItemProps} props
 * @param {JSX.Element[]} children
 */
const CheckboxItem = (props, children) => {
  const {
    checked,
    name,
    disabled,
    onchange,
    media,
    ...itemProps
  } = props

  return (
    <Item
      {...itemProps}
      class={cc(itemProps.class, 'label-checkbox')}
      media={media || checkboxIcon}
      extraMedia={
        <input
          {...{ name, disabled, checked }}
          key="checkbox" type="checkbox"
          onchange={onchange && (e => onchange(e.target.checked))}
        />
      }
    > {children}</Item >
  )
}

export default CheckboxItem
