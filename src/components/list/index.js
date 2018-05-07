// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'
import './style.less'

const List = (props, children) => {
  return (
    <div {...props} class={cc('list-block', props.class)}>
      <ul>
        {children.map(child => <li>{child}</li>)}
      </ul>
    </div>
  )
}

const Item = ({ media, title, after, input, ...r }, children) => {
  return (
    <div class={cc('item-content')}>
      {media && <div class="item-media">{media}</div>}
      <div class="item-inner">
        <div class={cc('item-title', { label: !!input })}>{title || children}</div>
        {input && <div class="item-input">{input}</div>}
        {after && <div class="item-after">{after}</div>}
      </div>
    </div >
  )
}

export default List
export {
  Item
}
