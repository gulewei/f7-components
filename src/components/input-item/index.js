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
  return (
    <Item
      {...props}
      // no multiple line
      subTitle=''
      text=''
    />
  )
}

const Input = props => {
  return (
    <input {...props} type={props.type || 'text'} />
  )
}

export default InputItem

export {
  Input
}
