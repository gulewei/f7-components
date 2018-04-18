// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'

export const List = ({ whiteBg, margins, ...r }, children) => {
  return (
    <div
      {...r}
      class={cc('list-block', margins, { 'white-bg': whiteBg }, ...r)}
    >
      {children.map(child => <li>{child}</li>)}
    </div>
  )
}

export const Item = ({ media, title, after, input, ...r }, children) => {
  return (
    <div class={cc('item-content')}>
      {media && <div class="item-media">{media}</div>}
      <div class="item-inner">
        <div class="item-title">{title || children}</div>
        {input && <div class="item-input">{input}</div>}
        {after && <div class="item-after">{after}</div>}
      </div>
    </div>
  )
}
