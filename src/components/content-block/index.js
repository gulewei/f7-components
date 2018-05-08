import { h } from 'hyperapp'
import cc from 'classnames'
import './index.less'

/**
 * @typedef {Object} ContentBlockProps
 * @prop {boolean} [inner=false]
 * @prop {boolean} [inset=false]
 * @prop {string} [title]
 * @param {ContentBlockProps} props
 * @param {JSX.Element[]} children
 */
const ContentBlock = (props, children) => {
  const {
    inner = false,
    inset = false,
    title,
    ...rests
  } = props

  return renderWithTitle(title,
    children.length > 0 && <div {...rests} class={cc(rests.class, 'content-block', { inset })}>
      {renderContent(inner, children)}
    </div>
  )
}

function renderWithTitle (title, content) {
  return title ? [
    <div class="content-block-title">{title}</div>,
    content
  ] : content
}

function renderContent (inner, content) {
  return inner ? <div class="content-block-inner">{content}</div> : content
}

export default ContentBlock
