import { Component, ElementProperties } from '../_util/interfaces'

export default Panel

declare const Panel: PanelComponent<PanelProperties>

interface PanelComponent<P> extends Component<P> {
  /**
   * Open a predefined panel
   */
  open: (props: PanelOptions) => any,
  /**
   * Close predefined panel
   */
  close: () => any,
}

interface PanelOptions extends PanelProperties {
  /**
   * Panel content
   */
  content?: string | JSX.Element
}

export interface PanelProperties extends ElementProperties {
  /**
   * No animation
   */
  notAnimated?: boolean
  /**
   *  We may include up to 2 panels to our App, one on left side and another one on right side
   */
  position?: 'left' | 'right'
  /**
   * There could be one of two effects: "Reveal" (when panel moves out whole app's content) or "Cover" (when panel overlays app's content).
   * Note: reveal effect won't work well when Panel inside View element
   */
  effect?: 'cover' | 'reveal'
  /**
   * Extra classname on overlay
   */
  overlayClass?: string
  /**
   * Extra classname on panel
   */
  panelClass?: string
  /**
   * Callback when Panel starts its opening animation
   */
  onOpen?: () => void
  /**
   * Callback after Panel completes its opening animation
   */
  onOpened?: () => void
  /**
   * Callback when Panel starts its closing animation
   */
  onClose?: () => void
  /**
   * Callback after Panel completes its closing animation
   */
  onClosed?: () => void
  /**
   * Callback when the panel overlay is clicked
   */
  onOverlayClick?: () => void
}

