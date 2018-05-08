// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'
import './style.less'

/**
 * List block
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
    <div {...rests} class={cc(rests.class, 'list-block', { inset })}>
      <ul>
        {renderListChildren(children)}
      </ul>
      {label && <div class="list-block-label">{label}</div>}
    </div>
  )
}

const MEDIA_ITEM_CLASS = 'media-item'
const hasMediaClass = cls => cls.indexOf(MEDIA_ITEM_CLASS) > -1
function renderListChildren (children) {
  return children.map(child => (
    <li
      key={child.key}
      class={cc({ [MEDIA_ITEM_CLASS]: hasMediaClass(child.attributes.class) })}
    >{child}</li>
  ))
}

/**
 * @typedef {Object} ItemProps
 * @prop {boolean} [isLink=false]
 * @prop {JSX.Element} [media]
 * @prop {JSX.Element} title
 * @prop {JSX.Element} [after]
 * @prop {JSX.Element} [subTitle]
 * @prop {JSX.Element} [text]
 * @param {ItemProps} props
 */
const Item = (props) => {
  const {
    isLink,
    media,
    title,
    after,
    input, // used in input-item
    subTitle,
    text,
    ...rests
  } = props

  const multipleLine = subTitle || text
  const cls = cc(rests.class, 'item-content', {
    'item-link': isLink,
    [MEDIA_ITEM_CLASS]: multipleLine
  })

  return (
    <div {...rests} class={cls}>
      {media && <div class="item-media">{media}</div>}
      {multipleLine
        ? <MediaInner {...{ title, after, subTitle, text }} />
        : <ItemInner {...{ title, after, input }} />
      }
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
const ItemInner = ({ title, after, input }) => {
  return (
    <div class="item-inner">
      <div class={cc('item-title', { label: !!input })}>{title}</div>
      {input && <div class="item-input">{input}</div>}
      {after && <div class="item-after">{after}</div>}
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
const MediaInner = ({ title, after, subTitle, text }) => {
  return (
    <div class="item-inner">
      <div class="item-title-row">
        {title && <div class='item-title'>{title}</div>}
        {after && <div class="item-after">{after}</div>}
      </div>
      {subTitle && <div class="item-subtitle">{subTitle}</div>}
      {text && <div class="item-text">{text}</div>}
    </div>
  )
}

export default List
export {
  Item
}
