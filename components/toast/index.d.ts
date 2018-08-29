import { ElementProperties, TransitionProperties, Component, VNode } from '../_util/interfaces'

export default Toast

/**
 * Toast message
 */
declare const Toast: ToastComponent<ToastProperties>

export interface ToastComponent<P> extends Component<P> {
  /**
   * Perform a toast message
   */
  text: (msg: string, duration?: number) => void
}

export interface ToastProperties extends ElementProperties, TransitionProperties {
  /**
   * A toast message of string or VNode. Same as slot `children`
   */
  msg?: string | VNode
  /**
   * Click callback
   */
  onToastClick?: (e: Event) => void
  /**
   * (To be remove, use `class` instead) Specify class name of toast element 
   */
  toastClass?: string
}


