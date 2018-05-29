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
function List (props, children) {
  const {
    inset,
    label,
    ...rests
  } = props

  return (
    <div {...rests} class={cc(rests.class, 'list-block', { inset })}>
      <ul>
        {children.map(child => (
          <li key={child.key}>{child}</li>
        ))}
      </ul>
      {label && <div class="list-block-label">{label}</div>}
    </div>
  )
}

/**
 * @typedef {Object} ItemProps
 * @prop {boolean} [isLink=false]
 * @prop {boolean} [alignTop]
 * @prop {JSX.Element} [media]
 * @prop {JSX.Element} title
 * @prop {JSX.Element} [after]
 * @prop {JSX.Element} [subTitle]
 * @prop {JSX.Element} [text]
 * @prop {JSX.Element} [input]
 * @prop {JSX.Element} [extraMedia]
 * @prop {string} key
 * @prop {Function} [onclick]
 * @prop {(el: HTMLElement) => void} oncreate
 * @prop {(el: HTMLElement, done: Function) => void} onremove
 * @prop {(el: HTMLElement) => void} ondestroy
 * @prop {(el: HTMLElement, oldAttr: Object) => void} onupdate
 * @param {ItemProps} props
 * @param {JSX.Element[]} children
 */
const Item = (props, children) => {
  const {
    isLink,
    alignTop,
    media,
    title = children,
    after,
    // mulptiple line
    subTitle,
    text,
    // input
    input,
    // custom
    extraMedia,
    // lifecycle, events, key...
    key,
    onclick,
    oncreate,
    onremove,
    ondestroy,
    onupdate
  } = props

  const multipleLine = subTitle || text
  const cls = cc(props.class, 'item-content', {
    'item-link': isLink,
    'media-item': multipleLine,
    'align-top': alignTop
  })

  return h(
    extraMedia ? 'label' : 'div',
    { class: cls, key, onclick, oncreate, onremove, ondestroy, onupdate },
    [
      extraMedia,
      media && <div key="media" class="item-media">{media}</div>,
      renderInner(multipleLine, title, input, after, subTitle, text)
    ]
  )
}

const renderInner = (multipleLine, title, input, after, subTitle, text) => {
  return multipleLine
    ? (
      <div key="inner" class="item-inner">
        <div key="row" class="item-title-row">
          {input && <div key="title" class="item-title">{title}</div>}
          {after && <div key="after" class="item-after">{after}</div>}
        </div>
        {subTitle && <div key="sub" class="item-subtitle">{subTitle}</div>}
        {text && <div key="text" class="item-text">{text}</div>}
      </div>
    )
    : (
      <div key="inner" class="item-inner">
        <div key="title" class={cc('item-title', { label: !!input })}>{title}</div>
        {input && <div key="input" class="item-input">{input}</div>}
        {after && <div key="after" class="item-after">{after}</div>}
      </div>
    )
}

List.Item = Item

export default List
