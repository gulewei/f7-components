import { WraperProperties, TransitionProperties, Component } from '../_util/interfaces'


export interface ToastProperties extends WraperProperties, TransitionProperties {
  /**
   * A toast message of string or a VNode
   */
  msg: string | JSX.Element
  /**
   * Click handler when toast element is clicked
   */
  onToastClick?: (e: Event) => void

  /**
   * Specify class name of toast element
   */
  toastClass?: string
}

export interface ToastComponent<P> extends Component<P> {
  text: (msg: string, duration?: number) => void
}

/**
 * Toast componet
 */
declare const Toast: ToastComponent<ToastProperties>

export default Toast
