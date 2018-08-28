// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'

const View = (props, children) => {
  const { outside, ...rests } = props
  return (
    <div {...rests} class={cc('view', rests.class)}>
      <div key="pages" class="pages">{children}</div>
      {outside}
    </div>
  )
}

export default View
