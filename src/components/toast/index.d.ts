import { Component } from 'hyperapp'
import { WraperProperties, TransitionProperties } from '../_utils/interfaces'


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

/**
 * Toast componet
 */
declare const Toast: Component<{
  
}>

export default Toast
