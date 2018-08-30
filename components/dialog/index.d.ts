import { TransitionProperties, WraperProperties, Component } from '../_util/interfaces'

export default Dialog

/**
 * Dialog message
 */
declare const Dialog: DialogComponent<DialogProperties>

type CloseActions = { close: () => void }

export interface DialogComponent<P> extends Component<P> {
  config: (options: { title?: string, okText?: string, cancelText?: string }) => void
  alert: (text: string, title?: string, onOk?: () => void) => CloseActions
  // alert: (text: string, onOk?: () => void) => CloseActions
  confirm: (text: string, title?: string, onOk?: () => void, onCancel?: () => void) => CloseActions
  // confirm: (text: string, onOk?: () => void, onCancel?: () => void) => CloseActions
  action: (text: string, title?: string, buttons?: DialogButtonModel[]) => CloseActions
  // action: (text: string, buttons?: DialogButtonModel[]) => CloseActions
  custom: (props: DialogProperties) => CloseActions
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
   * Button properties
   */
  buttons: Array<DialogButtonModel>
  /**
   * Sub-main content
   */
  afterText?: string | JSX.Element
  /**
   * Display buttons vertially
   */
  verticalButtons?: boolean
  /**
   * Event handler when any button is clicked
   */
  onButtonsClick?: (e: Event) => void
  /**
   * Event handler when mask is clicked
   */
  onOverlayClick?: (e: Event) => void

  onOpen?: (el: HTMLElement) => void
  onClose?: (el: HTMLElement) => void
}

export interface DialogButtonModel {
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
