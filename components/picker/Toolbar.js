// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Toolbar from '../toolbar'
// import cc from 'classnames'

/**
 * @typedef {Object} PickerToolbarProps
 * @prop {JSX.Element} [left]
 * @prop {JSX.Element} [right]
 * @prop {JSX.Element} [center]
 * @prop {string} [toolbarClass]
 * @param {PickerToolbarProps} props
 */
export default (props) => {
  const {
    left,
    right,
    center,
    toolbarClass
  } = props

  return (
    <Toolbar class={toolbarClass}>
      <div key="left" class="left">{left}</div>
      {center && <div class="center">{center}</div>}
      <div key="right" class="right">{right}</div>
    </Toolbar>
  )
}
