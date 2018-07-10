// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import { Toolbar } from '../toolbars'
// import cc from 'classnames'

/**
 * @typedef {Object} PickerToolbarProps
 * @prop {JSX.Element} [left]
 * @prop {JSX.Element} [right]
 * @prop {JSX.Element} [center]
 * @prop {string} [toolbarClass]
 * @param {PickerToolbarProps} props
 */
const PickerToolbar = (props) => {
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

// /**
//  * @typedef {Object} PickerToolbarLinkProps
//  * @prop {string | JSX.Element} text
//  * @prop {(e: Event) => void} [onclick]
//  * @prop {string} [class]
//  * @param {PickerToolbarLinkProps} props
//  */
// const PickerLink = (props) => {
//   const {
//     text,
//     ...rest
//   } = props

//   return (
//     <a {...rest} class={cc('link', props.class)}>{text}</a>
//   )
// }

// export {
//   PickerToolbar,
//   PickerLink
// }

export default PickerToolbar
