import { TransitionProperties, WraperProperties, Component, Slot } from '../_util/interfaces'

export default Dialog

/**
 * `Dialog` is a small content pane that pops up over App's main content. Dialogs are usualy used to ask something from user, or to notify or warn user.
 */
declare const Dialog: DialogComponent<DialogProps>

type CloseActions = { close: () => void }

export interface DialogComponent<P> extends Component<P> {
  alert: (text: string, title?: string, onOk?: () => void) => CloseActions
  // alert: (text: string, onOk?: () => void) => CloseActions
  confirm: (text: string, title?: string, onOk?: () => void, onCancel?: () => void) => CloseActions
  // confirm: (text: string, onOk?: () => void, onCancel?: () => void) => CloseActions
  action: (text: string, title?: string, buttons?: ButtonOption[]) => CloseActions
  // action: (text: string, buttons?: DialogButtonModel[]) => CloseActions
  custom: (props: DialogProps) => CloseActions
  config: (options: { title?: string, okText?: string, cancelText?: string }) => void
}

export interface DialogProps extends WraperProperties, TransitionProperties {
  /**
   * title
   */
  title?: Slot
  /**
   * text content
   */
  text?: Slot
  /**
   * text that will be placed after `text`
   */
  afterText?: Slot
  /**
   * array of buttons, each button should be presented as Object with button options
   */
  buttons?: Array<ButtonOption>
  /**
   * vertical buttons layout
   */
  verticalButtons?: boolean
  /**
   * callback when user clicks any of Dialog's button
   */
  onButtonsClick?: (e: Object) => void
  /**
   * callback when user clicks overlay
   */
  onOverlayClick?: (e: Object) => void
  /**
   * create hook
   */
  onOpen?: (el: HTMLElement) => void
  /**
   * destroy hook
   */
  onClose?: (el: HTMLElement) => void
}

export interface ButtonOption {
  /**
   * button's text
   */
  text: Slot
  /**
   * callback when user click this button
   */
  onclick?: (e: Object) => void
  /**
   * set to true for bold button text
   */
  bold?: boolean
}
