// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'

const View = (props, children) => {
  return (
    <div {...props} class={cc('view', props.class)}>
      <div class="pages">{children}</div>
    </div>
  )
}

export default View
