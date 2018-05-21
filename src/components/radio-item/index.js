// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'
// eslint-disable-next-line
import { Item } from '../list'
// eslint-disable-next-line
import Icon from '../icon'
import './index.less'

const radioIcon = <Icon name="form-radio" />

/**
 * @typedef {Object} RadioItemProps
 * @prop {boolean} checked
 * @prop {string} [name]
 * @prop {boolean} [disabled]
 * @prop {(checked: boolean) => void} [onchange]
 * @prop {JSX.Element} [media]
 * @param {RadioItemProps} props
 * @param {JSX.Element[]} children
 */
const RadioItem = (props, children) => {
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
      class={cc(itemProps.class, 'label-radio')}
      media={media || radioIcon}
      extraMedia={
        <input
          key="radio" type="radio"
          {...{ name, disabled, checked, onchange }}
        />
      }
    > {children}</Item >
  )
}

export default RadioItem
