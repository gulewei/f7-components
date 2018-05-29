import { Component, VNode } from 'hyperapp'

export as namespace h7Components

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
export const Overlay: Component<{
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

/**
 * Toast componet
 */
export const Toast: Component<{
  /**
   * Specify the create or remove of toast element
   */
  show: boolean
  /**
   * A toast message of string or a VNode
   */
  msg: string | VNode
  /**
   * Click handler when toast element is clicked
   */
  onToastClick?: (e: Event) => void

  /**
   * Specify class name of toast element
   */
  toastClass?: string
  /**
   * Specify enter animation class name
   */
  enterClass?: string
  /**
   * Specify exit animation class name
   */
  exitClass?: string
  /**
   * Specify class name of wraper element.
   * Default as 'toast-wrpaer'
   */
  wraperClass?: string
  /**
   * Wraper key
   */
  Key?: string
}>