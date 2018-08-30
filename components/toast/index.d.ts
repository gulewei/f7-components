import { WraperProperties, TransitionProperties, Component, VNode } from '../_util/interfaces'

export default Toast

/**
 * Toast message
 */
declare const Toast: ToastComponent<ToastProperties>

export interface ToastComponent<P> extends Component<P> {
  /**
   * Perform a toast message.
   * `duration` default as `1500`ms, passe `0` to make it not close automatically
   */
  text: (msg: string, duration?: number, onClose?: () => void, mask?: boolean, onClick: () => void) => void

  hide: () => void
}

export interface ToastProperties extends WraperProperties, TransitionProperties {
  /**
   * A toast message of string or VNode. Same as slot `children`
   */
  msg?: string | VNode
  /**
   * Specify class name of toast element 
   */
  toastClass?: string
  /**
   * Whether to show a transparent mask, which will prevent touch event of the whole page
   */
  mask?: boolean
  /**
   * Click callback
   */
  onToastClick?: (e: Event) => void
  /**
   * oncreate
   */
  onOpen?: () => void
  /**
   * ondestroy
   */
  onClose?: () => void
}


