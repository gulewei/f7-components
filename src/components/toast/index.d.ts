/**
 * Toast componet
 */
const Toast: Component<{
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

export default Toast
