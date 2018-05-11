import { h } from 'hyperapp'
import cc from 'classnames'

/**
 * @typedef {Object} ToolbarProps
 * @prop {string} [key]
 * @prop {string} [class]
 * @param {ToolbarProps} props
 * @param {JSX.Element[]} children
 */
const Toolbar = (props, children) => {
  return (
    <div {...props} class={cc('toolbar', props.class)}>
      <div class="toolbar-inner">
        {children}
      </div>
    </div>
  )
}

export default Toolbar
