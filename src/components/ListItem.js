import { h } from 'hyperapp'
import cc from 'classnames'

export const ListItem = ({ media, title, after, ...r }) => {
  return (
    <div class={cc('item-content')}>
      {media && <div class="item-media">{media}</div>}
      <div class="item-inner">
        <div class="item-title">{title}</div>
        <div class="item-after">{after}</div>
      </div>
    </div>
  )
}
