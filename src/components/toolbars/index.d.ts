import { ElementProperties, Component } from '../_utils/interfaces'

interface Bordered {
  noBorder?: boolean
}

export interface NavbarProperties extends Bordered, ElementProperties { }

/**
 * Navbar is a fixed (with Fixed and Through layout types) area at the top of a screen that contains Page title and navigation elements.
 */
declare const Navbar: Component<NavbarProperties>

export default Navbar

export interface ToolbarProperties extends Bordered, ElementProperties {}

/**
 * Toolbar is a fixed (with Fixed and Through layout types) area at the bottom of a screen that contains navigation elements.
 */
export const Toolbar: Component<ToolbarProperties>

/**
 * Toolbar does not have any parts, just plain links inside
 */
export const ToolbarLink: Component<ElementProperties>

 