import { ElementProperties, OuterHairlines, Component, Slot } from '../_util/interfaces'

export default ContentBlock

/**
 * Content blocks designed (mostly) to add extra formatting and required spacing for text content
 */
declare const ContentBlock: Component<ContentBlockProperties>

interface ContentBlockProperties extends ElementProperties, OuterHairlines {
  /**
   *  wrap content with additional "content-block-inner" element for content extra highlighting
   */
  inner?: boolean
  /**
   * inset content block
   */
  inset?: boolean
  /**
   * block title before Block
   */
  title?: Slot
}
