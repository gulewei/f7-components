// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'
import './style.less'

/**
 * @typedef {Object} ListProps
 * @prop {boolean} [inset=false]
 * @prop {string} [label='']
 * @param {ListProps} props
 * @param {JSX.Element[]} children
 */
const List = (props, children) => {
  const {
    inset,
    label,
    ...rests
  } = props

  return (
    <div {...rests} class={cc('list-block', rests.class, { inset })}>
      <ul>
        {children.map(child => <li>{child}</li>)}
      </ul>
      {!!label &&
        <div class="list-block-label">{label}</div>
      }
    </div>
  )
}

const Item = ({ media, title, after, input, isLink, ...r }, children) => {
  return (
    <div class={cc('item-content', { 'item-link': isLink })}>
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
