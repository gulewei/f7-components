// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import Toolbar from '../toolbar'
// import cc from 'classnames'

/**
 * @typedef {Object} PickerToolbarProps
 * @prop {string} [toolbarClass]
 * @prop {string} [okText]
 * @prop {string} [cancelText]
 * @prop {string} [onOk]
 * @prop {string} [onCancel]
 *
 * @param {PickerToolbarProps} props
 */
const PickerToolbar = (props, children) => {
  const {
    title = children,
    okText,
    cancelText,
    onOk,
    onCancel,
    toolbarClass
  } = props

  return (
    <Toolbar class={toolbarClass}>
      <div key="_left" class="left">
        <a class="link" onclick={onCancel}>{cancelText}</a>
      </div>
      {title}
      <div key="_right" class="right">
        <a class="link" onclick={onOk}>{okText}</a>
      </div>
    </Toolbar>
  )
}

export default PickerToolbar
