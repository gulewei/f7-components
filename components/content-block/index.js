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
    ...rests
  } = props

  const elClass = cc(
    rests.class,
    'content-block',
    {
      inset,
      'no-hairlines': noHairlines
    }
  )

  const content = (
    <div {...rests} class={elClass}>
      {inner
        ? <div class="content-block-inner">{children}</div>
        : children
      }
    </div>
  )

  return [
    title && <div class="content-block-title">{title}</div>,
    children.length > 0 && content
  ]
}

export default ContentBlock
