// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import { Toolbar } from '../toolbars'

/**
 * @typedef {Object} PickerToolbarProps
 * @prop {JSX.Element} [left]
 * @prop {JSX.Element} [right]
 * @prop {JSX.Element} [center]
 * @prop {string} [class]
 * @param {PickerToolbarProps} props
 */
const PickerToolbar = (props) => {
  const {
    left,
    right,
    center
  } = props

  return (
    <Toolbar class={props.class}>
      <div key="left" class="left">{left}</div>
      {center && <div class="center">{center}</div>}
      <div key="right" class="right">{right}</div>
    </Toolbar>
  )
}

export default PickerToolbar
