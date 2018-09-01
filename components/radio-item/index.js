// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'
// eslint-disable-next-line
import List from '../list'
// eslint-disable-next-line
import Icon from '../img-icon'
// import './index.less'

const radioIcon = <Icon name="form-radio" />

/**
 * @typedef {Object} RadioItemProps
 * @prop {boolean} [checked]
 * @prop {(value?: string) => any} [onChange]
 * @prop {string} [value]
 * @prop {string} [name]
 * @prop {boolean} [disabled]
 * @prop {boolean} [readonly]
 * @prop {Object} [radioProps]
 * @prop {Object} [radioMedia]
 *
 * @param {RadioItemProps} props
 * @param {JSX.Element[]} children
 */
const RadioItem = (props, children) => {
  const {
    checked,
    onChange,
    name,
    disabled,
    readonly,
    radioProps,
    radioMedia = radioIcon,
    ...rests
  } = props

  return (
    <List.Item
      {...rests}
      useLabel
      class={cc('label-radio', rests.class)}
      media={radioMedia}
      contentStart={
        <input
          {...{ ...radioProps, name, checked, disabled, readonly }}
          onchange={e => onChange(e.target.checked)}
          type="radio"
          key="content-start"
        />
      }
    >
      {children}
    </List.Item>
  )
}

export default RadioItem
