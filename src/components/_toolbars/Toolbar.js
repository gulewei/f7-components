import { h } from 'hyperapp'
import cc from 'classnames'
import './index.less'

/**
 * @typedef {Object} ToolbarProps
 * @prop {string} [key]
 * @prop {string} [class]
 *
 * @param {ToolbarProps} props
 * @param {JSX.Element[]} children
 */
const Toolbar = (props, children) => {
  return (
    <div {...props} class={cc('toolbar', props.class)}>
      <div class="toolbar-inner">{children}</div>
    </div>
  )
}

export default Toolbar

/**
 * @typedef {Object} ToolbarLinkProps
 * @prop {string} text
 * @prop {Function} [onclick]
 * @prop {string} [class]
 *
 * @param {ToolbarLinkProps} props
 */
export const ToolbarLink = (props, children) => {
  return (
    <a {...props} class={cc('link', props.class)} >{children}</a>
  )
}
