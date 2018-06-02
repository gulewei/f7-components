import { ElementProperties } from '../_utils/interfaces';
import { Component } from 'hyperapp';

export interface ButtonProperties extends ElementProperties {

  fill?: boolean

  big?: boolean

  round?: boolean

  disabled?: boolean

  text: string | JSX.Element

}

/**
 * Button component
 */
declare const Button: Component<ButtonProperties>

export default Button

