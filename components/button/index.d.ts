import { ElementProperties } from '../_util/interfaces';
import { Component } from 'hyperapp';

export interface ButtonProperties extends ElementProperties {
  /**
   * Makes button filled color
   */
  fill?: boolean
  /**
   * Makes big button
   */
  big?: boolean
  /**
   * Makes button round
   */
  round?: boolean
  /**
   * Button content
   */
  text?: string | JSX.Element

  disabled?: boolean
  
}

/**
 * Buttons ready to use
 */
declare const Button: Component<ButtonProperties>

export default Button

