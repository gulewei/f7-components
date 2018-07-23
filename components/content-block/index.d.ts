import { ElementProperties, OuterHairlines, Component } from '../_util/interfaces'

interface ContentBlockProperties extends ElementProperties, OuterHairlines {
  /**
   * Adds additional "inner" element for content extra highlighting
   */
  inner?: boolean
  /**
   * Makes block inset
   */
  inset?: boolean
  /**
   * Add block title before Block (content-block or list-block)
   */
  title?: string | JSX.Element
}

/**
 * Content blocks designed (mostly) to add extra formatting and required spacing for text content:
 */
declare const ContentBlock: Component<ContentBlockProperties>

export default ContentBlock
