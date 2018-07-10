import { Component } from 'hyperapp'
import { TransitionProperties } from '../_util/interfaces'

interface EnumOverlayTypes {
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
 * Possible overlay type
 */
export const enumOverlayTypes: EnumOverlayTypes

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

/**
 * Overlay component
 */
declare const Overlay: Component<OverlayProperties>

export default Overlay