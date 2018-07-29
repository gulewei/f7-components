import { h } from 'hyperapp'
import cc from 'classnames'

/**
 * @typedef {Object} ItemWraperProps
 * @prop {boolean} [isLink]
 * @prop {boolean} [alignTop]
 * @prop {boolean} [useLabel]
 * @prop {JSX.Element} [contentStart]
 * @prop {JSX.Element} [media]
 * @prop {JSX.Element} [title]
 * @prop {JSX.Element} [input]
 * @prop {JSX.Element} [after]
 * @prop {JSX.Element} [subTitle]
 * @prop {JSX.Element} [text]
 *
 * @param {ItemWraperProps} props
 * @param {JSX.Element[]} children
 */
export default (props, children) => {
  const {
    isLink,
    alignTop,
    useLabel,
    contentStart,
    media,
    title = children.length > 0 ? children : props.title,
    input,
    after,
    subTitle,
    text,
    ...wraperProps
  } = props

  const isMedia = !!(subTitle || text)
  const wraperCls = cc(wraperProps.class, 'item-content', {
    'item-link': isLink,
    'align-top': alignTop,
    'media-item': isMedia
  })
  const WraperEl = useLabel ? 'label' : 'div' // eslint-disable-line

  return (
    <WraperEl
      {...wraperProps}
      class={wraperCls}
    >
      {contentStart}
      {media && <div key="media" class="item-media">{media}</div>}
      <div key="inner" class="item-inner">
        {isMedia
          ? [
            <div key="row" class="item-title-row">
              {renderTitle(title, input, after)}
            </div>,
            <div key="sub" class="item-subtitle">{subTitle}</div>,
            text && <div key="text" class="item-text">{text}</div>
          ]
          : renderTitle(title, input, after)
        }
      </div>
    </WraperEl>
  )
}

const renderTitle = (title, input, after) => {
  return [
    title && <div key="title" class={cc('item-title', { label: !!input })}>{title}</div>,
    input && <div key="input" class="item-input">{input}</div>,
    after && <div key="after" class="item-after">{after}</div>
  ]
}
