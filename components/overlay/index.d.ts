import { TransitionProperties, Component } from '../_util/interfaces'

export interface EnumOverlayTypes {
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

export interface OverlayProperties {
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
   * Additional class name
   */
  overlayClass?: string
  /**
   * Element key
   */
  key?: string
}

interface OverlayComponent<P> extends Component<P> {
  /**
   * Possible overlay type
   */
  TYPES: EnumOverlayTypes
}

/**
 * Overlay component
 */
declare const Overlay: OverlayComponent<OverlayProperties>

export default Overlay