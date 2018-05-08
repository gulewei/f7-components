// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import { Item } from '../List'
import './index.less'

/**
 * @typedef {Object} InputItemProps
 * @prop {JSX.Element} title
 * @prop {JSX.Element} input
 * @prop {JSX.Element} [media]
 * @prop {JSX.Element} [after]
 * @param {InputItemProps} props
 */
const InputItem = (props) => {
  const {
    input,
    subTitle,
    text,
    ...rests
  } = props

  return (
    <Item
      {...rests}
      class={rests.class}
      input={input}
      // no multiple line
      subTitle=''
      text=''
    />
  )
}

export default InputItem
