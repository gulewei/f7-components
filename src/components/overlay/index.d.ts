/**
 * Possible overlay type
 */
export const OVERLAY_TYPES: {
  /**
 * Default overlay for most modals
 */
  modal: 'modal',
  /**
   * Invisible overlay
   */
  preloader: 'preloader-indicator',
  /**
   * Overlay for popup
   */
  popup: 'popup',
  /**
   * Overlay for picker
   */
  picker: 'picker-modal'
}

/**
 * Overlay component
 */
const Overlay: Component<{
  /**
   * Overlay type
   */
  type: 'modal' | 'preloader-indicator' | 'popup' | 'picker-modal'
  /**
   * Use animation when enter or exit
   */
  notAnimated?: boolean
  /**
   * Click handler when overlay clicked
   */
  onOverlayClick?: (e: Event) => void
  /**
 * Specify enter animation class name
 */
  enterClass?: string
  /**
   * Specify exit animation class name
   */
  exitClass?: string
  /**
   * Additional class name
   */
  overlayClass?: string
  /**
   * Element key
   */
  key?: string
}>

export default Overlay