import { h } from 'hyperapp'
import './index.less'

const View = (props, children) => {
  return (
    <div class="view">
      <div class="pages">{children}</div>
    </div>
  )
}

export default View
