// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'
// eslint-disable-next-line
import Icon from '../img-icon'
// eslint-disable-next-line
import { ListItem } from '../list'
// import './index.less'

const checkboxIcon = <Icon name="form-checkbox" />

/**
 * @typedef {Object} CheckboxItemProps
 * @prop {boolean} checked
 * @prop {string} name
 * @prop {string} value
 * @prop {(e: Event) => void} onchange
 * @prop {boolean} [disabled]
 * @prop {boolean} [readonly]
 * @prop {boolean} [required]
 * @prop {JSX.Element} [media]
 *
 * @param {CheckboxItemProps} props
 * @param {JSX.Element[]} children
 */
const CheckboxItem = (props, children) => {
  const {
    checked,
    name,
    value,
    onchange,
    disabled,
    readonly,
    required,
    media,
    ...itemProps
  } = props

  return (
    <ListItem
      {...itemProps}
      useLabel
      class={cc('label-checkbox', itemProps.class)}
      media={media || checkboxIcon}
      contentStart={
        <input
          {...{ checked, name, value, onchange, disabled, readonly, required }}
          type="checkbox"
          key="content-start"
        />
      }
    > {children}</ListItem >
  )
}

export default CheckboxItem
