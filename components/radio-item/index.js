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
    onChange = () => { },
    value,
    name,
    disabled,
    readonly,
    radioProps,
    radioMedia = radioIcon,
    ...rests
  } = props

  return (
    <ListItem
      {...rests}
      useLabel
      class={cc('label-radio', rests.class)}
      media={radioMedia}
      contentStart={
        <input
          {...{ ...radioProps, name, value, checked, disabled, readonly }}
          onchange={e => onChange(e.target.value)}
          type="radio"
          key="content-start"
        />
      }
    >
      {children}
    </ListItem>
  )
}

export default RadioItem
