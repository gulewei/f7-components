import { ElementProperties, Component, Slot } from '../_util/interfaces'

export default Button

/**
 * Button
 */
declare const Button: Component<ButtonProps>

export interface ButtonProps extends ElementProperties {
  /**
   * filled style
   */
  fill?: boolean
  /**
   * big size
   */
  big?: boolean
  /**
   * round style
   */
  round?: boolean
  /**
   * button content 
   */
  text?: Slot
  /**
   * click event handler
   */
  onClick?: (e: Object) => void
  /**
   * whether disabled
   */
  disabled?: boolean
}

