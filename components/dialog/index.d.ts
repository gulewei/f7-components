import { TransitionProperties, WraperProperties, Component } from '../_util/interfaces'

export default Dialog

/**
 * Dialog message
 */
declare const Dialog: DialogComponent<DialogProperties>

type CloseDialog = () => void

export interface DialogComponent<P> extends Component<P> {
  config: (options: { title?: string, okText?: string, cancelText?: string }) => void
  alert: (text: string, title?: string, onOk?: () => void) => CloseDialog
  confirm: (text: string, title?: string, onOk?: () => void, onCancel?: () => void) => CloseDialog
  action: (text: string, title?: string, buttons?: DialogButtonModel[]) => CloseDialog
  custom: (props: CustomOptions) => CloseDialog
}

type ActionAccessor = (_, { close: CloseDialog }) => any

interface CustomOptions extends DialogProperties {
  onButtonsClick?: (e: Event) => ActionAccessor
  onOverlayClick?: (e: Event) => ActionAccessor
  onOpen?: (el: HTMLElement) => ActionAccessor
  onClose?: (el: HTMLElement) => ActionAccessor
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
