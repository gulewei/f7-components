// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'
// eslint-disable-next-line
import { ListItem } from '../list'
// eslint-disable-next-line
import Icon from '../img-icon'
// import './index.less'

const radioIcon = <Icon name="form-radio" />

/**
 * @typedef {Object} RadioItemProps
 * @prop {boolean} checked
 * @prop {string} name
 * @prop {string} value
 * @prop {(e: Event) => void} onchange
 * @prop {boolean} [disabled]
 * @prop {boolean} [readonly]
 * @prop {boolean} [required]
 * @prop {JSX.Element} [media]
 *
 * @param {RadioItemProps} props
 * @param {JSX.Element[]} children
 */
const RadioItem = (props, children) => {
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
      class={cc('label-radio', itemProps.class)}
      media={media || radioIcon}
      contentStart={
        <input
          {...{ checked, name, value, onchange, disabled, readonly, required }}
          type="radio"
          key="content-start"
        />
      }
    > {children}</ListItem >
  )
}

export default RadioItem
