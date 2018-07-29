import { ElementProperties, Component, VNode, Bordered } from '../_util/interfaces'

export interface NavbarProperties extends Bordered, ElementProperties { 
  left?: VNode | string
  center?: VNode | string
  right?: VNode | string
}

/**
 * Navbar is a fixed (with Fixed and Through layout types) area at the top of a screen that contains Page title and navigation elements.
 */
export const Navbar: Component<NavbarProperties>

export default Navbar
