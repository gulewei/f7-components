import { Component } from 'hyperapp'
import { TransitionProperties, WraperProperties } from '../_utils/interfaces'

export interface DialogButtonProperties {
  /**
   * Button content
   */
  text: string | JSX.Element
  /**
   * Click handler
   */
  onclick?: (e: Event) => void
  /**
   * bold font
   */
  bold?: boolean
}


export interface DialogProperties extends WraperProperties, TransitionProperties {
  /**
   * Title content
   */
  title: string | JSX.Element
  /**
   * Main content
   */
  text: string | JSX.Element
  /**
   * Sub-main content
   */
  afterText?: string | JSX.Element
  /**
   * Button properties
   */
  buttons: Array<DialogButtonProperties>
  /**
   * Event handler when any button is clicked
   */
  onButtonsClick?: (e: Event) => void
  /**
   * Event handler when mask is clicked
   */
  onMaskClick?: (e: Event) => void
  /**
   * Display buttons vertially
   */
  verticalButtons?: boolean
}

/**
 * Dialog component
 */
declare const Dialog: Component<DialogProperties>

export default Dialog
