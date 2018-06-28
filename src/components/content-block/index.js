// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'

/**
 * @typedef {Object} ContentBlockProps
 * @prop {boolean} [inner=false]
 * @prop {boolean} [inset=false]
 * @prop {string} [title]
 * @prop {boolean} [noHairlines]
 *
 * @param {ContentBlockProps} props
 * @param {JSX.Element[]} children
 */
const ContentBlock = (props, children) => {
  const {
    inner,
    inset,
    title,
    noHairlines,
    ...elProps
  } = props

  const elClass = cc(
    elProps.class,
    'content-block',
    {
      inset,
      'no-hairlines': noHairlines
    }
  )

  return renderWithTitle(title,
    children.length > 0 && <div {...elProps} class={elClass}>
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
